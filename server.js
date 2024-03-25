const express =  require('express');
const { Server } = require('socket.io');
const app = express();
require('dotenv').config

const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000
app.use(express.static(__dirname + '/public'));


app.get("/",(req,res)=>{
  res.sendFile(__dirname+'/index.html')
})

http.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})

//socket
const io = new Server(http)
io.on('connection',(socket)=>{
    console.log("connected")
    socket.on("message",(msg)=>{
      socket.broadcast.emit("messageFromServer",msg)
    })
})

