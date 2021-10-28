const express= require('express')
const app= express()
const http = require('http')
const cors=require('cors')
 app.use(cors())
 app.use("/bower_components", express.static('bower_components'))
 const {Server} = require('socket.io')
 const server= http.createServer(app)
 const io = new Server(server,{
     cors:{
     origin:"http://localhost:3000"
     
 }

})




io.on("connection", (socket)=>{
// console.log("Haiii")
// console.log(socket.id)

socket.on ("join-room", (data)=>{
    socket.join(data)


    //console.log( `${ socket.id} joined chat room ${data}`)
})

socket.on("send-message",(data)=>{
socket.to(data.room).emit("receive-message", data)
})

socket.on("disconnect", (socket)=>{
    console.log("Socket disconnected "+ socket.id)
    })
})




 server.listen(3001, ()=>{
     console.log("Server Running ")
 })

 