import GameDataHandler from './GameDataHandler'
import { StatusCode } from './socket'

class AbstractGameDataHandler extends GameDataHandler {

  getGameId(){
  }

  onCreated(gameData, statusCode, responseData) {
    if(statusCode === StatusCode.SUCCESS){
      return gameData;
    }else {
      throw new Error("서버가 게임 생성에 실패했습니다.");
    }
  }

}

export default AbstractGameDataHandler