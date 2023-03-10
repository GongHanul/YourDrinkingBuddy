import { io } from "socket.io-client"
import { addPlayer, removePlayer, getPreservedGameDataHandler, updateGameData, initializePlayerViewPos, setGameStatePlay, setGameStateIdle, updateGameResult, GameState, setStateIdle, CocktailMakerState } from "./store";
import store from "./store";
import Swal from "sweetalert2";
import {Cookies} from 'react-cookie'

const cookies = new Cookies();

const defaultAddr = 'localhost:9000';

const cookieExpires = new Date();
cookieExpires.setFullYear(cookieExpires.getFullYear() + 100);

const getAddress = () => {
  return cookies.get('dispenser-address');
}

const setAddress = (address) => {
  return cookies.set('dispenser-address', address, {path: '/', expires:cookieExpires} );
}

if(getAddress() === undefined){
  setAddress(defaultAddr);
}

// 서버IP와 PORT는 웹 설정창에서의 로컬파일이나 쿠키등을 통해 읽어올 수 있도록 변경해야 함. 설정창도 필요해보임.
export let socket = io(getAddress(), { transports: ["websocket"] });


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
    // 플레이중이 아니면 폭파시킨다.
    if (game.gameState !== GameState.PLAY) {
      requestNoGamesPlayed();
    }
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
    store.dispatch(setGameStateIdle());
    store.dispatch(updateGameResult(completeGameResult));
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
    if (destroyGameResult) {
      store.dispatch(updateGameResult(destroyGameResult));
    }
    notifyCallback(requestData);
  })
}

export const listenOffDestroyGame = () => {
  socket.off("server:destroyGame");
}

export const listenOnMakingCocktail = () => {
  socket.on("server:makeCocktail", (requestData) => {
    console.log("boop");
    const cocktailMaker = store.getState().cocktailMaker;
    if(cocktailMaker.state === CocktailMakerState.BUSY){
      store.dispatch(setStateIdle())
    }
  })
}

export const listenOffMakingCocktail = () => {
  socket.off("server:makeCocktail");
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
  send("client:forceStopMakingCocktail", "ForceStopMakingCocktail", requestCallback);
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
    const createGameResult = getPreservedGameDataHandler().onCreated(game, response.statusCode, response.data);
    store.dispatch(updateGameData(createGameResult))
    store.dispatch(setGameStatePlay());
  });
}

// 클라이언트 -> 서버 게임 재시작 요청
export const requestRecreateGame = (gameId, playerCount) => {
  send("client:createGame", { gameId: gameId, playerCount: playerCount }, (response) => {
    const game = store.getState().game;
    const createGameResult = getPreservedGameDataHandler().onCreated(game, response.statusCode, response.data);
    store.dispatch(updateGameData(createGameResult))
    store.dispatch(setGameStatePlay());
  });
}

// 클라이언트 -> 서버 게임 파기 요청
export const requestDestroyGame = () => {
  send("client:destroyGame", null, (response) => {
    const game = store.getState().game;
    if (game.gameState === GameState.PLAY) {
      getPreservedGameDataHandler().onDestroyed(game, response.statusCode, response.data);
    }
    store.dispatch(setGameStateIdle());
  });
}

// 클라이언트 -> 서버 게임 완료 요청
export const requestCompleteGame = (requestData) => {
  send("client:completeGame", requestData);
}

// 클라이언트 -> 서버 게임이 진행중이지 않음을 알림
export const requestNoGamesPlayed = (requestData) => {
  send("client:destroyGame", requestData);
}


// 클라이언트 -> 서버 데이터 요청
export const requestChangeGame = (requestData, requestCallback) => {
  send('client:changeGame', requestData, requestCallback);
}


export const isNotConnected = () => {
  return !socket || socket.connected === false;
}

// 소켓 연결
const trySocketConnection = () => {
  if (socket) return;
  socket.connect();
};

export const showModalToChangeDispenserAddress = () => {
  Swal.fire({
    title: '디스펜서 서버 주소 입력',
    input: 'text',
    inputValue: `${getAddress()}`,
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showClass: {
      popup: 'swal2-noanimation',
      backdrop: 'swal2-noanimation'
    },
    hideClass: {
      popup: '',
      backdrop: ''
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // get new address from input field
      const newAddress = result.value;
      changeDispenserAddress(newAddress);
      document.location.href="/";
    }
  });
}

export const changeDispenserAddress = (addr) => {
  setAddress(addr);
  socket.disconnect();
}

export const checkConnection = () => {
  if(isNotConnected()){
    Swal.fire({
      title: '서버에러',
      text: '디스펜서 서버와 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
      confirmButtonText: 'address 변경',
      showCancelButton: true,
      cancelButtonText: '닫기',
      icon: 'error'
    }).then((result) => {
      if (result.isConfirmed) {
        showModalToChangeDispenserAddress();
      }
    });
    return false;
  }
  return true
} 

export const send = (event, data, callback) => {
  if (isNotConnected()) {
    trySocketConnection();
  }
  socket.emit(event, data, callback);
};

const defaultCallback = (data) => { };

// global listening socket
listenOnChangeGame(defaultCallback);
listenOnPlayerParticipate(defaultCallback);