import { io } from "socket.io-client"
import { addPlayer, getPreservedGameDataHandler, updateGameData } from "./store";
import store from "./store";

export const socket = io("localhost:9000", { transports: ["websocket"] });

export let StatusCode = {
  SUCCESS: 0,
  FAILURE: -1
}

// 수신부

// 서버-> 클라이언트  게임 시작전 플레이어 참가 의사를 밝힐 때
export const listenOnPlayerParticipate = (notifyCallback) => {
  socket.on("server:playerParticipate", (requestData, requestCallback) => {
    const game = store.getState().game;
    if (game.player.indexOf(requestData.playerId) !== -1) {
      store.dispatch(addPlayer(requestData.playerId))
      notifyCallback(requestData);
      requestCallback({ statusCode: StatusCode.SUCCESS, data: "participate" });
    } else {
      requestCallback({ statusCode: StatusCode.FAILURE, data: "alreadyParticipate" })
    }
  })
}

export const listenOffPlayerParticipate = () => {
  socket.off("server:playerParticipate");
}

// 서버-> 클라이언트 라즈베리파이 서버가 화면 변경을 요청할 때
export const listenOnChangeGame = (notifyCallback) => {
  socket.on("server:changeGame", (requestData) => {
    const game = store.getState().game;
    console.log(game);
    console.log(store)
    const changeGameResult = getPreservedGameDataHandler().onChanged(game.gameData, requestData);
    store.dispatch(updateGameData(changeGameResult));
    notifyCallback(requestData);
  })
}

export const listenOffChangeGame = () => {
  socket.off("server:changeGame");
}

// 서버-> 클라이언트 라즈베리파이 서버가 게임이 완료되었음을 요청할 때
export const listenOnCompleteGame = (notifyCallback) => {
  socket.on("server:completeGame", (requestData) => {
    const game = store.getState().game;
    const completeGameResult = getPreservedGameDataHandler().onCompleted(game.gameData, requestData);
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
    const destroyGameResult = getPreservedGameDataHandler().onDestroyed(game.gameData, StatusCode.SUCCESS, requestData);
    store.dispatch(updateGameData(destroyGameResult));
    notifyCallback(requestData);
  })
}

export const listenOffDestroyGame = () => {
  socket.off("server:destroyGame");
}

// 송신부

// 클라이언트 -> 서버 칵테일 제조 요청
export const requestMakeCocktail = (ports, requestCallback) => {
  console.log(`ports : ${ports}`)
  send("client:makeCocktail", ports, requestCallback);
}

// 클라이언트 -> 서버 칵테일 제조 강제 중지 요청
export const requestForceStopMakingCocktail = (requestCallback) => {
  send("client:forceStopMakingCocktail", null, requestCallback);
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
    getPreservedGameDataHandler().onCreated(game.gameData, response.statusCode, response.data);
  });
}

// 클라이언트 -> 서버 게임 파기 요청

export const requestDestoryGame = (isGameResultNeeded) => {
  send("client:destoryGame", { isGameResultNeeded: isGameResultNeeded }, (response) => {
    const game = store.getState().game;
    getPreservedGameDataHandler().onDestroyed(game.gameData, response.statusCode, response.data);
  });
}

// 소켓 연결
const trySocketConnection = () => {
  if (socket) return;
  socket.connect();
};

const send = (event, data, callback) => {
  if (!socket || socket.connected === false) {
    trySocketConnection();
  }
  socket.emit(event, data, callback);
};
