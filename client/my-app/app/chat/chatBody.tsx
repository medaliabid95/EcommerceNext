import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBody: React.FC<ProfileProps> = ({ message,sender, reciever, arr, }) => {
    const [user, setUser] = useState([])
    const fetch = (id: number) => {
        axios.get(`http://localhost:3000/api/profile/get/${id}`)
            .then((resp) => setUser(resp.data))
            .catch((err) => console.log(err))

    }

    console.log("sender", sender);

    useEffect(() => {
        fetch(sender)
    }, [])

  
    
        return (
            <div className='messenger'>
                {arr.map((msg) => {
                    return msg.senderId === sender ? (
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
                    )
                }
                )}
            </div>
        );
    };

    export default ChatBody;