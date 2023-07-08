const express = require("express")
const {Server} = require("socket.io");
const http = require("http");
const cors = require("cors")

const app = express()
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    

    socket.on("joinRoom", room => socket.join(room))

    socket.on("newMessage", ({newMessage, room}) => {
        io.in(room).emit("getLatestMessage", newMessage)
    })
  
  });

  app.get("/", (req, res) => {res.send("Chat BE with Socket.io by Aman Kumar"); res.end()});



 const port = process.env.PORT || 8001

 server.listen(port, console.log(`App started at port ${port}`))
