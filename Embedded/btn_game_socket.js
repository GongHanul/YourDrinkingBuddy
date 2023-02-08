// FE에서 종료 신호 받으면 sendData 
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var clientFE = "";
//ip player naming 
let playerData = {
  "70.12.229.167" : 1,
  "70.12.225.75" : 2,
  "70.12.229.229" : 3,
  "70.12.000.000" : 4,
}

// FE에서 송신한 게임 종류
let gameID = {}

//controller에서 연결된 player 수
let playerIng=0;

//게임데이터
let sendData={};
let gameResult={};

//연결상태
let sendStatus={};
let playerStatus={
  id: 1,
  connection: 1,
}
let playerCNT ={1:0 , 2:0, 3:0, 4:0}; // 내부 관리용

//game 정상 실행
let gameStatus={};
//음료 정상 실행
let beverageStatus={};

// var Gpio = require('onoff').Gpio;
// var Relay1 = new Gpio(2, 'out');
// var Relay2 = new Gpio(3, 'out');
// var Relay3 = new Gpio(4, 'out');
// var Relay4 = new Gpio(17, 'out');

// var Relays = [Relay1, Relay2, Relay3, Relay4];

// async function sleep(ms) {
//     return new Promise(resolve => {
//         setTimeout(resolve, ms);
//     });
// }

// async function controlRelay() {
//     for(let i = 0; i < 4; i++) {
//         Relays[i].writeSync(1);
//         await sleep(1000);
//         Relays[i].writeSync(0);
//         await sleep(1000);
//     }
// }
  
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //FE에서 받아온 사람 숫자만큼 배열 선언
  
  const req = socket.request;
  // 연결 ip parsing
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipslice = ip.slice(7);
  //console.log("connection with", ipslice, playerData[ipslice]);
  //console.log(playerCNT)

  //지금 연결된 컨트롤러만 count
  if(playerCNT[playerData[ipslice]]==0)
  {
    playerIng+=1; 
    playerCNT[playerData[ipslice]]=1;
    playerStatus.id = playerData[ipslice];
    playerStatus.connection = 1; // connection
    sendStatus['playerNum']=playerIng;
    sendStatus['playerStatus']=playerStatus;
    console.log(sendStatus)
    console.log("connectionAll", playerCNT)
    const json = JSON.stringify(sendStatus);
    io.to(clientFE).emit('server:playerParticipate', json);
    //io.to(clientFE).emit('chat message', json);
  }

  // FE와 연결되면 현재 컨트롤러 연결상태 송신
    socket.on('client:connectServer', (msg) => {
      console.log(msg);
      clientFE = socket.id;
      console.log("clientFE", clientFE)
      for(var i=1; i<=4; i++)
      {
        if(playerCNT[i]==0) continue;
        playerStatus.id = i;
        playerStatus.connection = 1; // connection
        const json = JSON.stringify(sendStatus);
        sendStatus['playerNum']=playerIng;
        sendStatus['playerStatus']=playerStatus;
        io.to(clientFE).emit('server:playerParticipate', json);
        //io.to(clientFE).emit('chat message', json);
      }
    });

    //FE로부터 어떤 게임인지 수신
    socket.on('client:createGame', (msg, callback) => {
      //FE로 게임의 초깃값을 보내준다.
      //실제 데이터 msg.gameId
      console.log('message: ' + msg);
      
      //arduino로 게임 전달.
      io.emit('arduino:changeGame', msg);
      gameStatus['statusCode'] = 0;
      gameStatus['data'] = "";
      console.log("gameStatus:", gameStatus);
      const json = JSON.stringify(gameStatus);     
      //client로 게임 연결/실행 상태 전송               
      callback(json)
    });
    
    //arduino에서 값을 받아온다.
    socket.on('arduino:upload', (msg)=> {
      console.log(msg);

      //sendData FE 데이터 송신
      gameResult.id = playerData[ipslice];
      gameResult.cnt = msg.count;
      sendData['gameData'] = gameResult;
      console.log("sendData:", sendData);
      const json = JSON.stringify(sendData);
      io.to(clientFE).emit('server:changeGame', json);
      //io.to(clientFE).emit('chat message', json);
    });
    socket.on('client:destroyGame', (msg, callback) => {
      console.log(msg);
      // 필요하다면 데이터 init 추가
      gameStatus['statusCode'] = 0;
      delete gameStatus['data'];
      const json = JSON.stringify(gameStatus);
      callback(json);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected', ipslice);
      //player 연결이 끊어지면 status에 기록하고 값을 FE에 보내준다.
      if(playerCNT[playerData[ipslice]]==1)
      {
        playerStatus.connection=0;
        playerStatus.id = playerData[ipslice];
        playerCNT[playerData[ipslice]]=0;
        
        playerIng-=1; 
        sendStatus['playerNum']=playerIng;//참여중인 player 수
        sendStatus['playerStatus'] = playerStatus; //끊긴 플레이어 정보
        const json = JSON.stringify(sendStatus);
        io.to(clientFE).emit('server:playerParticipate', json);
        //io.to(clientFE).emit('chat message', json);
        console.log(playerStatus);
        console.log("connectionAll", playerCNT);
       }
    });

    socket.on('makeCocktail', (msg, callback)=> {
      // [1, 3, 0, 0]
      console.log(typeof msg);
      controlRelay();
      callback(json);
    })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
