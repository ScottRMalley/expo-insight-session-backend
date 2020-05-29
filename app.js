const express = require('express');
const socketServer = require('socket.io');
const http = require('http');

const app = express();
const port = 3001;

const serve = http.createServer(app);
const io = socketServer(serve);

app.get('/', (req, res) => res.send('Hello World!'));

serve.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const connections = [];
io.on('connection', function (socket) {
  console.log("Connected to Socket!!" + socket.id)
  connections.push(socket)
  socket.on('disconnect', function () {
    console.log('Disconnected - ' + socket.id);
  });

  socket.on('bug', (name) => {
    io.emit('bugged',name)
    console.log(`Scott was bugged by ${name}`);
  })
});