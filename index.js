const express = require('express'); // using express
const socketIO = require('socket.io');
const http = require('http')
var path = require ("path");
const port = process.env.PORT||3000 // setting the port
let app = express();
app.use(express.static(path.join(__dirname, './views')));
let server = http.createServer(app)
let io = socketIO(server)
// make a connection with the user from server side
io.on('connection', (socket)=>{
    console.log('New user connected');
     //emit message from server to user
     socket.emit('newMessage', {
       from:'test',
       text:'test',
       createdAt:123
     });
    // listen for message from user
    socket.on('createMessage', (newMessage)=>{
      console.log('newMessage', newMessage);
      console.log (socket.client.conn.server.clientsCount)
    });
   
    // when server disconnects from user
    socket.on('disconnecting', (params)=>{
      console.log('disconnected from user===>', socket.id);
    });
  });
   
server.listen(port,()=>{
    console.log("server running")
});
