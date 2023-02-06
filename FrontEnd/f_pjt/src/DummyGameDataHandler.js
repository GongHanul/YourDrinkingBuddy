import GameDataHandler from './GameDataHandler'
import { StatusCode } from './socket'

class DummyGameDataHandler extends GameDataHandler {

  createGameData(){
    return {messages : []}
  }

  onCreated(gameData, statusCode, responseData) {
    if(statusCode === StatusCode.SUCCESS){
      return {messages: [...gameData.messages, "생성성공"]};
    }else {
      return {messages: [...gameData.messages, "생성실패"]};
    }
  }

  onChanged(gameData, requestData) {
    return {messages: [...gameData.messages, `받은 데이터 : ${requestData}`]};
  }

  onDestroyed(gameData, statusCode, data) {
    return {messages: [...gameData.messages, `강제 종료되었음. 서버가 마지막으로 보낸 데이터 : ${data}`]};
  }

  onCompleted(gameData, requestData) {
    return {messages: [...gameData.messages, `완료되었음. 결과 : ${requestData}`]};
  }

}

export default DummyGameDataHandler