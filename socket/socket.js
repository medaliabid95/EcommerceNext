const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors : {
        origin :"http://localhost:3000",
        methods :["GET", "POST"]
    }
})


activeUsers=[]
io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            console.log("New User Connected", `${socket.id}`);
        }
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
        const { receiverId , message} = data;
        // const user = activeUsers.find((user) => user.userId === receiverId);
        // console.log("Sending from socket to :", receiverId)
        // console.log("Data: ", data)
        // if (user) {
        //     io.to(user.socketId).emit("receive-message", { senderId: socket.id, message })
        // }
        console.log("data",data.message);
        socket.broadcast.emit("receive-message", data)
        console.log(socket.id);
    });
   
    
});

server.listen(8080, () => {
    console.log('Server started - http://localhost:8080');
  })