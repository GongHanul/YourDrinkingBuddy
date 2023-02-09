import AbstractGameDataHandler from './AbstractGameDataHandler'

const timePerTuen = 5;

class SoundGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 4;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = {turnIndex: 0, turn: -1, timePerTurn: timePerTuen};
    let playerData = [];
    for (const view of views) {
      playerData.push({ playerId: view, db: 0 });
    }
    result["playerData"] = playerData;
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
      result.AbstractGameDataHandlerplayerData[idx] = {playerId: requestData.gameData.id, db: requestData.gameData.db};
      return result;
    }
    return gameState.gameData;
  }
}

export default SoundGameDataHandler