import { configureStore, createSlice } from '@reduxjs/toolkit'
import {
  listenOnChangeGame,
  listenOffChangeGame,
  listenOnDestroyGame,
  listenOffDestroyGame,
  requestMakeCocktail,
  requestForceStopMakingCocktail,
  listenOnCompleteGame,
  listenOffCompleteGame,
  requestCreateGame,
  requestDestoryGame,
  StatusCode,
  requestChangeBeverage,
  requestConnectServer,
  requestClearBeverage,
  send,
  requestCompleteGame
} from './socket';

export const CocktailMakerState = {
  IDLE: 0,
  BUSY: 1
}

const defaultCallback = (data) => {};

let cocktailMaker = createSlice({
  name: 'cocktailMaker',
  initialState: {state: CocktailMakerState.IDLE, before: [-1,-1,-1,-1]},
  reducers: {
    setStateIdle(state) {
      console.log("set state idle")
      state.state = CocktailMakerState.IDLE;

    },
    setStateBusy(state) {
      state.state = CocktailMakerState.BUSY;
    },
    makeCocktail(state, action) {
      const ratio = action.payload;
      console.log(ratio)
      if (state.state === CocktailMakerState.IDLE) {
        requestMakeCocktail(ratio, (responseData) => {
          if (responseData.statusCode === StatusCode.SUCCESS) {
            store.dispatch(setStateIdle());
          }
        });
        state.state = CocktailMakerState.BUSY;
      }
    },
    stopMakeCocktail(state) {
      if (state.state === CocktailMakerState.BUSY) {
        requestForceStopMakingCocktail((responseData) => {
          if (responseData.statusCode === StatusCode.FAILURE) {
            alert("술 디스펜서로 부터 예외가 발생했습니다. 술 디스펜서를 확인해주세요.")
          }
          store.dispatch(setStateIdle());
        });
      }
    },
    clearPorts(state, action){
      if(state.state === CocktailMakerState.BUSY){
        alert("술 디스펜서가 작동중입니다. 기달려주세요.");
        return
      }
      const beverageIdsInPort = action.payload;
        let ports = [];
        for(let i=0; i<beverageIdsInPort.length; i++){
          ports.push(beverageIdsInPort[i] !== state.before[i]);
        }
        requestClearBeverage(ports,(responseData)=>{
          if (responseData.statusCode === StatusCode.FAILURE) {
            alert("술 디스펜서로 부터 예외가 발생했습니다. 술 디스펜서를 확인해주세요.")
          }
          store.dispatch(setStateIdle());
        });
      state.state = CocktailMakerState.BUSY;
    },
    changePorts(state, action) {
      if(state.state === CocktailMakerState.BUSY){
        alert("술 디스펜서가 작동중입니다. 기달려주세요.");
        return
      }
      const beverageIdsInPort = action.payload;
        let ports = [];
        for(let i=0; i<beverageIdsInPort.length; i++){
          ports.push(beverageIdsInPort[i] !== state.before[i]);
        }
        requestChangeBeverage(ports,(responseData)=>{
          if (responseData.statusCode === StatusCode.FAILURE) {
            alert("술 디스펜서로 부터 예외가 발생했습니다. 술 디스펜서를 확인해주세요.")
          }
          store.dispatch(setStateIdle());
        });
        state.before = beverageIdsInPort;
      state.state = CocktailMakerState.BUSY;
    }
  }
})

export let { setStateIdle, setStateBusy, makeCocktail, stopMakeCocktail, clearPorts, changePorts } = cocktailMaker.actions


let ratio = createSlice({
  name: 'ratio',
  initialState: [
    { rate: 0, id: 1, beverage_id: -1 },
    { rate: 0, id: 2, beverage_id: -2 },
    { rate: 0, id: 3, beverage_id: -3 },
    { rate: 0, id: 4, beverage_id: -4 }
  ],
  reducers: {
    increaseRatio(state, action) {
      state[action.payload].rate++
    },
    decreaseRatio(state, action) {
      state[action.payload].rate--
    },
    changeBeverage(state, action) {
      state[action.payload.idx].beverage_id = action.payload.beverage_id
    },
    changeRatio(state, action) {
      state[action.payload.idx].rate = action.payload.rate
    },
    resetRatio(state, action) {
      state[action.payload.idx].rate = 0
    },
  },
});


export let { increaseRatio, decreaseRatio, changeBeverage, changeRatio, resetRatio } = ratio.actions


let port = createSlice({
  name: 'port',
  initialState: [
    { beverage_id: '-1', beverage_image_url: 'img/bottle_pick.png' },
    { beverage_id: '-1', beverage_image_url: 'img/bottle.png' },
    { beverage_id: '-1', beverage_image_url: 'img/bottle_pick.png' },
    { beverage_id: '-1', beverage_image_url: 'img/bottle.png' }
  ],
  reducers: {
    changePort(state, action) {
      state[action.payload.idx] = {
        beverage_id: action.payload.beverage_id,
        beverage_image_url: action.payload.beverage_image_url,
      };
    },
  },
});


export let { changePort } = port.actions



let beverage = createSlice({
  name: 'beverage',
  initialState: [{}],
  reducers: {
    inputBeverage(state, action) {
      action.payload.push({
        beverage_id: -1,
        beverage_name: '없음',
        beverage_image_url: 'img/bottle.png'
      })
      return state = action.payload
    },
  },
});

export let { inputBeverage } = beverage.actions

let beverageMap = createSlice({
  name: 'beverageMap',
  initialState: {},
  reducers: {
    setBeverages(state, action) {
      state = {}
      action.payload.forEach((beverage) => {
        state[beverage.beverage_id] = beverage;
      });
      return state;
    },
    insertBeverageByID(state, action) {
      return state[action.payload] = beverage;
    },
    deleteBeverageByID(state, action) {
      delete state[action.payload]
    },
  },
});

export let { setBeverages, insertBeverageByID, deleteBeverageByID } = beverageMap.actions


let recipe = createSlice({
  name: 'recipe',
  initialState: [{}],
  reducers: {
    inputRecipe(state, action) {
      return state = action.payload
    },
  },
});

export let { inputRecipe } = recipe.actions

let recoRecipes = createSlice({
  name: 'recoRecipes',
  initialState: ['레', '시', '피'],
  reducers: {
    changeReco(state, action) {
      return state = action.payload
    }
  },
});

export let { changeReco } = recoRecipes.actions

export let GameState = {
  IDLE: 0,
  READY: 1,
  PLAY: 2,
}

export const preserveGameDataHandler = (gameDataHandler) => {
  console.log(gameDataHandler)
  window.gameDataHandler = gameDataHandler;

}

export const getPreservedGameDataHandler = () => {
  return window.gameDataHandler;
}

let game = createSlice({
  name: 'game',
  initialState: { gameState: GameState.IDLE, gameData: undefined, gameResult: undefined, playerStatus: [{id: 1, connection:1}, {id: 2, connection:1}, {id: 3, connection:1}, {id: 4, connection:1}], playerCount: 4, playerViewPos: [] },
  reducers: {

    // 여기서 플레이어 : 화면 map을 세팅한다. 임의배치한다.
    initializePlayerViewPos(state, action) {
      if (state.gameState !== GameState.READY) {
        // throw new Error("게임 준비중일때만 화면 당 플레이어 유저를 배치 할 수 있습니다.");
        return
      }
      const NeededplayerCount = action.payload;
      let result = [];
      for (let i = 0; i < state.playerStatus.length; i++) {
        if (state.playerStatus[i].connection === 1) {
          result.push(state.playerStatus[i].id);
        }
        if (result.length === NeededplayerCount) {
          break;
        }
      }
      result.sort();
      state.playerViewPos = result;
    },

    // setPlayer(state, action){
    //   const playerStatus = action.payload.playerStatus;
    //   const playerCount = action.payload.playerNum;
    //   state.playerStatus[playerStatus.id] = state.playerStatus = playerStatus;
    //   state.playerCount = playerCount;
    //   return state
    // },

    removePlayer(state, action) {
      const playerId = action.payload;
      state.playerStatus = state.playerStatus.filter((elem)=>elem.id !== playerId)
      state.playerCount = state.playerStatus.length;
    },

    addPlayer(state, action) {
      const playerId = action.payload;
      const idx = state.playerStatus.findIndex((elem)=> elem.id === playerId)
      if(idx === -1){
        state.playerStatus = [...state.playerStatus, {id: playerId, connection:1}]
      } else{
        state.playerStatus[idx].connection = 1;
      }
      state.playerCount = state.playerStatus.length;
    },

    // 게임을 설정한다.
    // payload 예시 : {gameData : {...}}
    // gameData는 GameData Interface를 따라야 한다.
    setGameDataHandler(state) {

      // gameData는 GameData Interface를 따라야 한다.
      // DI (Dependency Injection) 패턴을 사용하였기 때문에, 반드시 외부에서 생성하여 주입해야 한다.
      const gameDataInstance = getPreservedGameDataHandler().createGameData(state);
      const gameResultInstance = getPreservedGameDataHandler().createGameResult(state);
      state.gameData = gameDataInstance;
      state.gameResult = gameResultInstance;
    },

    updateGameData(state, action) {
      const gameData = action.payload;
      state.gameData = gameData;
    },

    updateGameResult(state, action){
      const gameResult = action.payload;
      state.gameResult = gameResult;
    },

    // 게임 상태를 Idle로 바꾼다.
    setGameStateIdle(state) {

      // listenOffPlayerParticipate();
      listenOffChangeGame();
      listenOffCompleteGame();
      listenOffDestroyGame();

      // IDLE상태가 되며 이제부터 게임 구성 이전으로 돌아간다.
      state.gameState = GameState.IDLE;
      state.playerViewPos = [];
    },

    // 게임 상태를 Ready로 바꾼다.
    // payload 예시 : {playerParticipateCallback : function(optional), destroyGameCallback : function(optional)}
    setGameStateReady(state, action) {
      const param = action.payload;

      // const playerParticipateCallback = param && param.playerParticipateCallback ? param.playerParticipateCallback : (data) => { };
      const destroyGameCallback = param && param.destroyGameCallback ? param.destroyGameCallback : defaultCallback;

      // listenOnPlayerParticipate(playerParticipateCallback);
      listenOnDestroyGame(destroyGameCallback);
      listenOffChangeGame();
      listenOffCompleteGame();
      requestConnectServer();

      // READY상태가 되며 이제부터 플레이어 참여를 기다린다.
      state.gameState = GameState.READY;
      state.playerViewPos = [];
    },

    // 게임 상태를 Play로 바꾼다.
    // payload 예시 : 
    //{ 
    //  changeGameCallback: function (optional), 
    //  destroyGameCallback: function (optional), 
    //  completeGameCallback: function (optional)
    //}
    setGameStatePlay(state, action) {
      const param = action.payload;

      const changeGameCallback = param && param.changeGameCallback ? param.changeGameCallback : defaultCallback;
      const destroyGameCallback = param && param.destroyGameCallback ? param.destroyGameCallback : defaultCallback;
      const completeGameCallback = param && param.completeGameCallback ? param.completeGameCallback : defaultCallback;

      // listenOffPlayerParticipate();
      listenOnChangeGame(changeGameCallback);
      listenOnDestroyGame(destroyGameCallback);
      listenOnCompleteGame(completeGameCallback);

      // READY상태가 되며 이제부터 게임 변경 사항, 완료등을 받는다.
      state.gameState = GameState.PLAY;
    },

    // 게임을 생성한다.
    // payload 예시 : {playerCount : 4}
    // notifyCallback은 player 데이터를 받아 View를 변경시키는 Callback 함수이다.
    // 단순히 redux와 바인딩 하는 경우 => 생략한다.
    // 바인딩이 불가능 한 상황인 경우 => playerID를 파라미터로 받아 View를 처리하는 Callback함수를 넣는다.
    createGame(state, action) {
      const param = action.payload;

      const handler = getPreservedGameDataHandler();

      console.log(handler.getGameId())

      if (handler.getGameId === undefined || (handler.getGameId() !== 0 && !handler.getGameId())) {
        throw new Error("GameDataHandler는 반드시 getGameId를 구현해야 합니다.")
      }

      const gameId = getPreservedGameDataHandler().getGameId();
      const playerCount = param.playerCount;

      // idle 상태가 아니면 게임 생성을 못하도록 막는다.
      if (state.gameState !== GameState.READY) {
        throw new Error("게임은 반드시 상태가 READY 인 경우만 생성이 가능합니다. 웹 당 하나의 게임만 생성가능합니다. 기존 게임을 파기해주세요.");
      }

      // gameId로 playerCount만큼 참여한다고 라즈베리파이 서버에 요청한다.
      // 해당 통신은 bloking/동기 통신이 보장되어야 한다.
      requestCreateGame(gameId, playerCount);
    },

    // 게임을 강제로 파기한다.
    // parameter는 없다.
    // 서버에 현재 게임 상황을 전부 파기하고 강제로 끝내도록 요청을 한다.
    // READY 혹은 PLAY 상황에서만 요청 가능하다.
    destroyGame(state) {
      if (state.gameState === GameState.IDLE) {
        throw new Error("게임 준비중이거나 게임 시작중이 아닙니다.");
      }

      // 게임 파기 요청을 라즈베리파이 서버에 요청한다.
      // 해당 통신은 bloking/동기 통신이 보장되어야 한다.
      requestDestoryGame(false);
    },


    // 게임 완료 요청을 날린다.
    // payload 예시 : {data:{...}}
    // 컨트롤러 입력을 통해 게임을 중단하는 게임에 경우 해당 메세지를 통해 게임 완료 요청을 한다.
    // PLAY 상황에서만 요청 가능하다.
    completeGame(state, action) {
      if(state.gameState !== GameState.PLAY){
        throw new Error("게임 시작중이 아닙니다.");
      }
      // 게임 완료 요청을 라즈베리파이 서버에 요청한다.
      const data = action.payload.data;
      requestCompleteGame(data);
    },

    // 이벤트 이름을 기준으로 라즈베리파이 서버에 요청한다.
    // 해당 통신은 게임 형태에 따라 동기 통신이 보장 되어야 할 수도 있다.
    // 현재 존재하는 6개 게임 기준으로는 동기화가 필요없다.
    changeGameViaEventName(state, action){
      const param = action.payload;
      const requestData = param.data;
      const eventName = param.eventName;
      const chanvgeGameCallback = param.chanvgeGameCallback ? param.chanvgeGameCallback : defaultCallback;
      if(state.gameState !== GameState.PLAY){
        throw new Error("게임 중이 아닙니다.");
      }
      send(eventName, requestData, chanvgeGameCallback);
    }
  },
});

export let { setPlayer, removePlayer, addPlayer, initializePlayerViewPos, setGameDataHandler, updateGameData, updateGameResult, setGameStateIdle, setGameStateReady, setGameStatePlay, createGame, destroyGame, completeGame, changeGameViaEventName } = game.actions;

const store = configureStore({
  reducer: {
    cocktailMaker: cocktailMaker.reducer,
    ratio: ratio.reducer,
    beverage: beverage.reducer,
    beverageMap: beverageMap.reducer,
    recipe: recipe.reducer,
    port: port.reducer,
    recoRecipes: recoRecipes.reducer,
    game: game.reducer,
  },
});

export default store;
