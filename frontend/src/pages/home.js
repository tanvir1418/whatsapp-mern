import React, { Fragment, useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";
import { getConversationId, getConversationName, getConversationPicture } from "../utils/chat";
const callData = {
    socketId: "",
    receivingCall: false,
    callEnded: false,
    name: "",
    picture: "",
    signal: "",
};

function Home({ socket }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);
    const [onlineUsers, setOnlineUsers] = useState([]);
    // call
    const [call, setCall] = useState(callData);
    const [stream, setStream] = useState();
    const [show, setShow] = useState(false);
    const { receivingCall, callEnded, socketId } = call;
    const [callAccepted, setCallAccepted] = useState(false);
    const [totalSecInCall, setTotalSecInCall] = useState(0);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    // typing
    const [typing, setTyping] = useState(false);

    // join user into the socket io
    useEffect(() => {
        socket.emit("join", user._id);

        // get online users
        socket.on("get-online-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    // call
    useEffect(() => {
        setupMedia();
        socket.on("setup socket", (id) => {
            setCall({ ...call, socketId: id });
        });
        socket.on("call user", (data) => {
            setCall({
                ...call,
                socketId: data.from,
                name: data.name,
                picture: data.picture,
                signal: data.signal,
                receivingCall: true,
            });
        });
        socket.on("end call", () => {
            setShow(false);
            setCall({ ...call, callEnded: true, receivingCall: false });
            myVideo.current.srcObject = null;
            if (callAccepted) {
                connectionRef?.current?.destroy();
            }
        });
    }, []);

    // call user function
    const callUser = () => {
        enableMedia();
        setCall({
            ...call,
            name: getConversationName(user, activeConversation.users),
            picture: getConversationPicture(user, activeConversation.users),
        });
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("call user", {
                userToCall: getConversationId(user, activeConversation.users),
                signal: data,
                from: socketId,
                name: user.name,
                picture: user.picture,
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("call accepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };

    // answer call function
    const answerCall = () => {
        enableMedia();
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("answer call", {
                signal: data,
                to: call.socketId,
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    // end call function
    const endCall = () => {
        setShow(false);
        setCall({ ...call, callEnded: true, receivingCall: false });
        myVideo.current.srcObject = null;
        socket.emit("end call", call.socketId);
        connectionRef?.current?.destroy();
    };

    const setupMedia = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
        });
    };

    const enableMedia = () => {
        myVideo.current.srcObject = stream;
        setShow(true);
    };

    // get conversations
    useEffect(() => {
        if (user?.token) {
            dispatch(getConversations(user.token));
        }
    }, [user]);

    useEffect(() => {
        // listening to received messages
        socket.on("receive message", (message) => {
            dispatch(updateMessagesAndConversations(message));
        });
        // listening when an user is typing
        socket.on("typing", (conversation) => setTyping(conversation));
        socket.on("stop typing", () => setTyping(false));
    }, []);

    return (
        <Fragment>
            <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
                {/* Container */}
                <div className="container h-screen flex py-[-19px]">
                    {/* Sidebar */}
                    <Sidebar onlineUsers={onlineUsers} typing={typing} />
                    {activeConversation._id ? <ChatContainer onlineUsers={onlineUsers} typing={typing} callUser={callUser} /> : <WhatsappHome />}
                </div>
            </div>
            {/* Call */}
            <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
                <Call
                    call={call}
                    setCall={setCall}
                    callAccepted={callAccepted}
                    myVideo={myVideo}
                    userVideo={userVideo}
                    stream={stream}
                    answerCall={answerCall}
                    show={show}
                    endCall={endCall}
                    totalSecInCall={totalSecInCall}
                    setTotalSecInCall={setTotalSecInCall}
                />
            </div>
        </Fragment>
    );
}

const HomeWithSocket = (props) => <SocketContext.Consumer>{(socket) => <Home {...props} socket={socket} />}</SocketContext.Consumer>;

export default HomeWithSocket;
