const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var Gpio = require('onoff').Gpio;
var Relay1 = new Gpio(2, 'out');
var Relay2 = new Gpio(3, 'out');
var Relay3 = new Gpio(4, 'out');
var Relay4 = new Gpio(17, 'out');

var Relays = [Relay1, Relay2, Relay3, Relay4];

var clients = [];

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function controlRelay() {
    for(let i = 0; i < 4; i++) {
        Relays[i].writeSync(1);
        await sleep(1000);
        Relays[i].writeSync(0);
        await sleep(1000);
    }
}
  
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('login', function(data) {
        var clientInfo = new Object();
        clientInfo.uid = data.uid;
        clientInfo.id = socket.id;
        clients.push(clientInfo);
    });

    socket.on('chat message', (msg) => {
      io.to(clients[0].uid).emit('chat message', msg);
      io.emit('server:changeGame', msg);
      console.log('message: ' + msg);
    });

    socket.on('upload', (msg)=> {
      console.log(msg);
      io.emit('upload', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      for(let i = 0; i < clients.length; i++) {
        var client = clients[i];
        if(client.id == socket.id) {
            clients.splice(i, 1);
            break;
        }
      }
    });

    socket.on('makeCocktail', (msg)=> {
      // [1, 3, 0, 0]
      console.log(typeof msg);
      controlRelay();
    })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
