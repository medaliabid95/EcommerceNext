"use client"
import React, { useState, useEffect, useContext } from 'react';
import "./chat.css"
import { io } from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '@/components/isAuth/authContext'
import ChatFooter from './chatFooter';
import ChatBody from './chatBody';
import ChatBar from './chatBar';
let socket = io("http://localhost:8080", { transports: ["websocket"] })


const Chat: React.FC<ProfileProps> = () => {

    const [message, setMessage] = useState("")
    const [messageSend, setMessageSend] = useState("")
    const [arr, setArr] = useState([])
    const [state, setState] = useState(false)

    const user = sessionStorage.getItem("userId")
    let role = sessionStorage.getItem("userRole")
    console.log(user);


    const sendMessage = (msg: string, send: number, recieve: number) => {
        socket.emit("send-message", { message: msg })
        // array.push(msg)
        // setArr(array)
        axios.post(`http://127.0.0.1:3000/chat/post/${send}/${recieve}`, {
            content: msg
        })
            .then((res) => { setState(!state) })
            .catch((err) => console.log(err)
            )
    }

    console.log("arr", arr);

    useEffect(() => {
        socket.on("receive-message", (data: any) => {
            // arr.push(data.message)
            // setArr(arr)
            fetch(user, 3)

        });
        fetch(user, 3)
    }, [state])

    const fetch = (send: number, recieve: number) => {
        axios.get(`http://127.0.0.1:3000/chat/all/${send}/${recieve}`)
            .then((res) => { setArr(res.data) })
            .catch((err) => console.log(err)
            )
    }

    return (
        <div className="chat">
            <ChatBar />
            <div className="chat__main">
                <ChatBody arr={arr} id={user} />
                <ChatFooter message={message} id={user} sendMessage={sendMessage} setMessage={setMessage} />
            </div>
        </div>
    )
}



export default Chat;