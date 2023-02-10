import AbstractGameDataHandler from './AbstractGameDataHandler'

const timePerTuen = 5;

class SoundGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 4;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = {turnIndex: 0, turn: views[0], timePerTurn: timePerTuen};
    let playerData = [];
    for (const view of views) {
      playerData.push({ playerId: view, db: 0, max:0 });
    }
    result["playerData"] = playerData;
    return result;
  }

  createGameResult(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, max:0 });
    }
    return result;
  }

  onTurnChange(gameState){
    const playerViewPos = gameState.playerViewPos;
    const gameData = Object.assign({}, gameState.gameData);
    const pvpSize = playerViewPos.length;
    const nextTurnIndex = (gameData.turnIndex + 1) % pvpSize;
    const nextTurn = playerViewPos[nextTurnIndex];
    gameData.turnIndex = nextTurnIndex;
    gameData.turn = nextTurn;
    
    return gameData;
  }

  onChanged(gameState, requestData) {
    const idx = gameState.gameData.playerData.findIndex((elem) => elem.playerId === requestData.gameData.id);
    if(idx > -1){
      let result = Object.assign({},gameState.gameData);
      let dbValue = (requestData.gameData.cnt)?requestData.gameData.cnt: ((requestData.gameData.max)? requestData.gameData.max : 0 );

      let updatedPlayerData = Object.assign([],result.playerData);

      updatedPlayerData[idx] = {playerId: requestData.gameData.id, db: dbValue, max: requestData.gameData.max};
      result.playerData = updatedPlayerData;
      return result;
    }
    return gameState.gameData;
  }

  onCompleted(gameState, requestData) {
    const players = requestData.gameData;
    let result = Object.assign([],gameState.gameResult);
    for(const player of players){
      const idx = gameState.gameResult.findIndex((elem) => elem.playerId === player.id);
      if(idx > -1){
        let resultOfPlayer = Object.assign({},result[idx]);
        resultOfPlayer.max = player.max? player.max : 0;
        result[idx] = resultOfPlayer;
      }
    }
    return result;
  }
}

export default SoundGameDataHandler