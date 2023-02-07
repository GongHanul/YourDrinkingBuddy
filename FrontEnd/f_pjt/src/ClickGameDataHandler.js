import AbstractGameDataHandler from './AbstractGameDataHandler'

class ClickGameDataHandler extends AbstractGameDataHandler {

  getGameId(){
    return 0;
  }

  createGameData(){
    return [];
  }

  onChanged(gameData, requestData) {
    return requestData.playerData;
  }
}

export default ClickGameDataHandler