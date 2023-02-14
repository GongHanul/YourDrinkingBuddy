import AbstractGameDataHandler from './AbstractGameDataHandler'

const wait = 0.0;

export const goal = 10.0;

export const timeout = 100000000;

class TimeEstimateGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 6;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = {playerData: [], lastClickedPlayerIdx: -1, clickedPlayerCnt: 0};
    for (const view of views) {
      result.playerData.push({ playerId: view, time: timeout});
    }
    return result;
  }

  onChanged(gameState, requestData) {
    const idx = gameState.gameData.playerData.findIndex((elem) => elem.playerId === requestData.gameData.id);
    if(idx > -1){
      if(requestData.gameData.cnt < wait || gameState.gameData.playerData[idx].time !== timeout){
        return gameState.gameData;
      }
      let gameState_gameData = Object.assign({},gameState.gameData);
      gameState_gameData.lastClickedPlayerIdx = idx;
      gameState_gameData.clickedPlayerCnt++;

      let gameState_gameData_playerData = Object.assign([],gameState_gameData.playerData);
      let gameState_gameData_playerData_idx = Object.assign({},gameState_gameData_playerData[idx]);

      gameState_gameData_playerData_idx.time = requestData.gameData.cnt - wait;
      gameState_gameData_playerData[idx] = gameState_gameData_playerData_idx;
      gameState_gameData.playerData = gameState_gameData_playerData;
      return gameState_gameData;
      
    }
    return gameState.gameData;
  }

  onCompleted(gameState, requestData) {
    let result = Object.assign([],gameState.gameData.playerData);
    result.sort((x,y) => { return Math.abs(goal - x.time) - Math.abs(goal - y.time)})
    return result;
  }

  createGameResult(gameState){
    return gameState.data;
  }

}

export default TimeEstimateGameDataHandler