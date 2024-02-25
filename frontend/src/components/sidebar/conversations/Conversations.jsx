import { useSelector } from "react-redux";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations } = useSelector((state) => state.chat);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.map((convo, index) => (
            <Conversation convo={convo} key={index} />
          ))}
      </ul>
    </div>
  );
};

export default Conversations;
