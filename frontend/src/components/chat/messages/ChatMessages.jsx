import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

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
      </div>
    </div>
  );
};

export default ChatMessages;
