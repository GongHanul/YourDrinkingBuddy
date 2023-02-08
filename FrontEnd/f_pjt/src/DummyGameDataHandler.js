import GameDataHandler from './GameDataHandler'
import { StatusCode } from './socket'

class DummyGameDataHandler extends GameDataHandler {

  createGameData(gameState) {
    return { messages: [] }
  }

  onCreated(gameState, statusCode, responseData) {
    if (statusCode === StatusCode.SUCCESS) {
      return { messages: [...gameState.gameData.messages, "생성성공"] };
    } else {
      return { messages: [...gameState.gameData.messages, "생성실패"] };
    }
  }

  onChanged(gameState, requestData) {
    return { messages: [...gameState.gameData.messages, `받은 데이터 : ${requestData}`] };
  }

  onDestroyed(gameState, statusCode, data) {
    return { messages: [...gameState.gameData.messages, `강제 종료되었음. 서버가 마지막으로 보낸 데이터 : ${data}`] };
  }

  onCompleted(gameState, requestData) {
    return { messages: [...gameState.gameData.messages, `완료되었음. 결과 : ${requestData}`] };
  }

}

export default DummyGameDataHandler