import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import Typing from "./Typing";

const ChatMessages = ({ typing }) => {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dxhbkvt39/image/upload/v1708972249/x7egogychl3xjh1ozejt.jpg')] bg-cover bg-no-repeat">
      {/* Container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {messages.map((message) => (
          <Message
            message={message}
            key={message._id}
            me={user._id === message.sender._id}
          />
        ))}
        {typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
