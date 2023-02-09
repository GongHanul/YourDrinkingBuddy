import AbstractGameDataHandler from './AbstractGameDataHandler'

class HeartRateGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 1;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, heartRate: 0 });
    }
    return result;
  }

  onChanged(gameState, requestData) {
    console.log(requestData)
    const idx = gameState.gameData.findIndex((elem) => elem.playerId === requestData.gameData.id);
    console.log(idx);
    if(idx > -1){
      let result = Object.assign([],gameState.gameData);
      console.log(result);
      result[idx] = {playerId: requestData.gameData.id, heartRate: requestData.gameData.heartRate};
      return result;
    }
    return gameState.gameData;
  }
}

export default HeartRateGameDataHandler