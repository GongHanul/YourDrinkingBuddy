import AbstractGameDataHandler from './AbstractGameDataHandler'

class HeartRateGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 1;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, bpm: 0 });
    }
    return result;
  }

  createGameResult(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, max: 0, mean: 0, min: 0, gap: 0, bpm: 0 });
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
      result[idx] = {playerId: requestData.gameData.id, bpm: requestData.gameData.cnt};
      return result;
    }
    return gameState.gameData;
  }

  onCompleted(gameState, requestData) {
    console.log(requestData)
    const players = requestData.gameData;
    let result = Object.assign([],gameState.gameResult);
    for(const player of players){
      const idx = gameState.gameResult.findIndex((elem) => elem.playerId === player.id);
      if(idx > -1){
        let resultOfPlayer = Object.assign({},result[idx]);
        resultOfPlayer.max = player.max;
        resultOfPlayer.mean = player.mean;
        resultOfPlayer.min = player.min;
        resultOfPlayer.gap = player.gap;
        resultOfPlayer.bpm = player.cnt;
        result[idx] = resultOfPlayer;
      }
    }
    return result;
  }
}

export default HeartRateGameDataHandler