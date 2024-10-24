const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { join } = require('node:path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});


const  generarRandom = () => {
  const num = 5;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

  return result;
}


io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');


  socket.on('chatmessage', (msg) => {
    id = socket.id
    console.log (id)
    io.emit('chatmessage', generarRandom(
      
    ) + " " + msg)
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
