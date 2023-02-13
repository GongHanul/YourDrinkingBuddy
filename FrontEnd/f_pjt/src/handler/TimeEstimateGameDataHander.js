import AbstractGameDataHandler from './AbstractGameDataHandler'

const wait = 10.0;

class TimeEstimateGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 6;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, time: 'Times Up!'});
    }
    return result;
  }

  onChanged(gameState, requestData) {
    const idx = gameState.gameData.findIndex((elem) => elem.playerId === requestData.gameData.id);
    if(idx > -1){
      if(requestData.gameData.cnt < wait || gameState.gameData[idx].time !== 'Times Up!'){
        return gameState.gameData;
      }
      let result = Object.assign([],gameState.gameData);
      result[idx].time = requestData.gameData.cnt;
      return result;
    }
    return gameState.gameData;
  }
}

export default TimeEstimateGameDataHandler