import { io } from "socket.io-client"
import { addPlayer, removePlayer, getPreservedGameDataHandler, updateGameData, initializePlayerViewPos, setGameStatePlay, setGameStateIdle } from "./store";
import store from "./store";

export const socket = io("70.12.226.153:3000", { transports: ["websocket"] });

export let StatusCode = {
  SUCCESS: 0,
  FAILURE: -1
}

// 수신부

// 서버-> 클라이언트  게임 시작전 플레이어 참가 의사를 밝힐 때
export const listenOnPlayerParticipate = (notifyCallback) => {
  socket.on("server:playerParticipate", (requestData) => {
    // const game = store.getState().game;
    console.log(requestData)
    if (requestData.playerStatus.connection === 1) {
      store.dispatch(addPlayer(requestData.playerStatus.id))
    } else {
      store.dispatch(removePlayer(requestData.playerStatus.id))
    }
    notifyCallback(requestData);
  })
}

listenOnPlayerParticipate((requestData)=>{});

// // 서버-> 클라이언트  게임 시작전 플레이어 참가 의사를 밝힐 때
// export const listenOnPlayerStatus = (notifyCallback) => {
//   socket.on("server:playerParticipate", (requestData) => {
//     store.dispatch(setPlayer(requestData))
//     notifyCallback(requestData);
//   })
// }

// export const listenoffPlayerStatus = () => {
//   socket.off("server:playerParticipate");
// }

// listenOnPlayerStatus();

// 서버-> 클라이언트 라즈베리파이 서버가 화면 변경을 요청할 때
export const listenOnChangeGame = (notifyCallback) => {
  listenOnChangeGameViaEventName('server:changeGame', notifyCallback);
}

export const listenOffChangeGame = () => {
  listenOffChangeGameViaEventName('server:changeGame');
}

export const listenOnChangeGameViaEventName = (eventName, notifyCallback) => {
  socket.on(eventName, (requestData) => {
    const game = store.getState().game;
    console.log(game);
    console.log(store)
    const changeGameResult = getPreservedGameDataHandler().onChanged(game, requestData);
    store.dispatch(updateGameData(changeGameResult));
    notifyCallback(requestData);
  })
}

export const listenOffChangeGameViaEventName = (eventName) => {
  socket.off(eventName);
}

// 서버-> 클라이언트 라즈베리파이 서버가 게임이 완료되었음을 요청할 때
export const listenOnCompleteGame = (notifyCallback) => {
  socket.on("server:completeGame", (requestData) => {
    const game = store.getState().game;
    const completeGameResult = getPreservedGameDataHandler().onCompleted(game, requestData);
    store.dispatch(updateGameData(completeGameResult));
    notifyCallback(requestData);
  })
}

export const listenOffCompleteGame = () => {
  socket.off("server:completeGame");
}

// 서버 -> 클라이언트 라즈베리파이 서버가 게임을 파기하도록 요청할 때
export const listenOnDestroyGame = (notifyCallback) => {
  socket.on("server:destroyGame", (requestData) => {
    const game = store.getState().game;
    const destroyGameResult = getPreservedGameDataHandler().onDestroyed(game, StatusCode.SUCCESS, requestData);
    store.dispatch(updateGameData(destroyGameResult));
    notifyCallback(requestData);
  })
}

export const listenOffDestroyGame = () => {
  socket.off("server:destroyGame");
}

// 송신부

// 클라이언트 -> 서버 화면 변경시 요청
export const requestConnectServer = () => {
  send("client:connectServer", {});
}

// 클라이언트 -> 서버 칵테일 제조 요청
export const requestMakeCocktail = (ports, requestCallback) => {
  console.log(`ports : ${ports}`)
  send("client:makeCocktail", ports, requestCallback);
}

// 클라이언트 -> 서버 칵테일 제조 강제 중지 요청
export const requestForceStopMakingCocktail = (requestCallback) => {
  send("client:forceStopMakingCocktail", null, requestCallback);
}

// 클라이언트 -> 서버 음료 변경시 초기화 요청
export const requestClearBeverage = (ports, requestCallback) => {
  send("client:clearBeverage", ports, requestCallback);
}

export const requestChangeBeverage = (ports, requestCallback) => {
  send("client:changeBeverage", ports, requestCallback);
}

// // 클라이언트 -> 서버 게임 시작 요청
// export const requestCreateGame = (gameId) => {
//   send("client:createGame", game_id, (response) => {
//     const game = useSelector((state) => state.game);
//     game.gameData.onCreated(response.statusCode, response.data);
//   });
// }

// 클라이언트 -> 서버 게임 시작 요청
export const requestCreateGame = (gameId, playerCount) => {
  send("client:createGame", { gameId: gameId, playerCount: playerCount }, (response) => {
    const game = store.getState().game;
    store.dispatch(initializePlayerViewPos(playerCount));
    getPreservedGameDataHandler().onCreated(game, response.statusCode, response.data);
    store.dispatch(setGameStatePlay());
  });
}

// 클라이언트 -> 서버 게임 파기 요청
export const requestDestoryGame = () => {
  send("client:destoryGame", null, (response) => {
    const game = store.getState().game;
    getPreservedGameDataHandler().onDestroyed(game, response.statusCode, response.data);
    store.dispatch(setGameStateIdle());
  });
}

// 클라이언트 -> 서버 데이터 요청
export const requestChangeGame = (requestData) => {
  requestChangeGameViaEventName('client:changeGame', requestData);
}

export const requestChangeGameViaEventName = (eventName, requestData) => {
  requestChangeGameViaEventName(eventName, requestData);
}

export const isConnected = () => {
  return !socket || socket.connected === false;
}

// 소켓 연결
const trySocketConnection = () => {
  if (socket) return;
  socket.connect();
};

const send = (event, data, callback) => {
  if (isConnected()) {
    trySocketConnection();
  }
  socket.emit(event, data, callback);
};