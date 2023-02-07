import AbstractGameDataHandler from './AbstractGameDataHandler'

class ClickGameDataHandler extends AbstractGameDataHandler {

  getGameId() {
    return 0;
  }

  createGameData(gameState) {
    const views = gameState.playerViewPos;
    let result = [];
    for (const view of views) {
      result.push({ playerId: view, cnt: 0 });
    }
    return result
  }

  onChanged(gameState, requestData) {
    return requestData.playerData;
  }
}

export default ClickGameDataHandler