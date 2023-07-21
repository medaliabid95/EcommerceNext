import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBody: React.FC<ProfileProps> = ({id, arr, userId, userRole }) => {
    const [user, setUser] = useState([])
    const fetch = (id:number) => {
        axios.get(`http://localhost:3000/api/profile/get/${id}`)
            .then((resp) => setUser(resp.data))
            .catch((err) => console.log(err))

    }

    useEffect(() => {
        fetch(id)
    }, [])

    return (
        <>
            <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn">LEAVE CHAT</button>
            </header>
            {arr.map((msg) =>{
                console.log(msg.senderId);
                console.log("user",id );
                
                console.log(msg.senderId === id );
                
                return msg.senderId === id ? (
                    <div className="message__container">
                        <div className="message__chats">
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{msg.content}</p>
                            </div>
                        </div>
                        <div className="message__status"></div>
                    </div>
                ) : (
                    <div className="message__container">
                        <div className="message__chats">
                            <p>Other</p>
                            <div className="message__recipient">
                                <p>{msg.content}</p>
                            </div>
                        </div>
                        <div className="message__status"></div>
                    </div>
                )}
            )}
        </>
    );
};

export default ChatBody;