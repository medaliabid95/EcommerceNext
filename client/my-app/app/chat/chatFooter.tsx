import React, { useState } from 'react';

const ChatFooter:React.FC<ProfileProps> = ({id,sendMessage,message,setMessage}) => {
 
  return (
    <div className="chat__footer">
      <form className="form">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn" onClick={(e)=>{e.preventDefault();sendMessage(message,id,3)}}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;