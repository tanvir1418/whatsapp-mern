import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { checkOnlineStatus } from "../../../utils/chat";

const Conversations = ({ onlineUsers }) => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo, index) => {
              let check = checkOnlineStatus(onlineUsers, user, convo.users);
              return <Conversation convo={convo} key={index} online={check} />;
            })}
      </ul>
    </div>
  );
};

export default Conversations;
