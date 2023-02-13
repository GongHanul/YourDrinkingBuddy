import AbstractGameDataHandler from './AbstractGameDataHandler'

const wait = 3.0;

class TimeEstimateGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 6;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = {playerData: [], lastClickedPlayerIdx: -1};
    for (const view of views) {
      result.playerData.push({ playerId: view, time: 'Times Up!'});
    }
    return result;
  }

  onChanged(gameState, requestData) {
    const idx = gameState.gameData.playerData.findIndex((elem) => elem.playerId === requestData.gameData.id);
    if(idx > -1){
      if(requestData.gameData.cnt < wait || gameState.gameData.playerData[idx].time !== 'Times Up!'){
        return gameState.gameData;
      }
      let gameState_gameData = Object.assign({},gameState.gameData);
      gameState_gameData.lastClickedPlayerIdx = idx;
      

      let gameState_gameData_playerData = Object.assign([],gameState_gameData.playerData);
      let gameState_gameData_playerData_idx = Object.assign({},gameState_gameData_playerData[idx]);

      gameState_gameData_playerData_idx.time = requestData.gameData.cnt - wait;
      gameState_gameData_playerData[idx] = gameState_gameData_playerData_idx;
      gameState_gameData.playerData = gameState_gameData_playerData;
      return gameState_gameData;
      
    }
    return gameState.gameData;
  }
}

export default TimeEstimateGameDataHandler