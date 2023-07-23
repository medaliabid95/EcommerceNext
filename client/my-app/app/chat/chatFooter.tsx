import React, { useState,useRef } from 'react';

const ChatFooter:React.FC<ProfileProps> = ({sender,reciever,sendMessage,message,setMessage}) => {
    const bottomEl = useRef(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="chat__footer">
      <form ref={bottomEl} className="form">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn"  onClick={(e)=>{e.preventDefault();sendMessage(message,sender,reciever);scrollToBottom}}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;