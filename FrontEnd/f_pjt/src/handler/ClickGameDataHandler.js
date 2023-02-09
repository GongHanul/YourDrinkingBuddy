import AbstractGameDataHandler from './AbstractGameDataHandler'

class ClickGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 3;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, cnt: 0 });
    }
    return result
  }

  createGameResult(gameState){
    return gameState.gameData;
  }

  onChanged(gameState, requestData) {
    console.log(requestData)
    const idx = gameState.gameData.findIndex((elem) => elem.playerId === requestData.gameData.id);
    console.log(idx);
    if(idx > -1){
      let result = Object.assign([],gameState.gameData);
      console.log(result);
      result[idx] = {playerId: requestData.gameData.id, cnt: requestData.gameData.cnt};
      return result;
    }
    return gameState.gameData;
  }
}

export default ClickGameDataHandler