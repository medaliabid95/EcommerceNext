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
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });

 
    socket.on("send-message", (data) => {
        const { receiverId , message} = data;
        console.log("data",data.message);
        socket.broadcast.emit("receive-message", data)
        console.log(socket.id);
    });
   
    
});

server.listen(8080, () => {
    console.log('Server started - http://localhost:8080');
  })