class GameDataHandler {

  // 자바스크립트는 타입스크립트와 다르게 아쉽게도 객체 타입을 만들 수 없다.
  // 그럼에도 타입을 사용해야만 한다.
  // 아래의 getData는 인터프리터 입장에서는 어떤 타입이던 허용하지만, 원칙상 해당하는 게임 Data 타입이외에 허락하지 않는다.
  // 제발 부탁이니 파라미터의 타입과 작성 컨벤션을 엄격하게 지켜주길 바란다.


  // 원칙 1. gameData는 정해진 타입이 있다. 직렬화 가능해야 한다.
  // 원칙 2. statusCode는 number만 허용한다. enum 타입으로 간주하고, 0은 SUCCESS, -1은 FAILURE로 정의한다.
  // 원칙 3. GameData를 확장해서 사용하고, 반드시 상속한다. 아래 구현되지 않은 함수는 하나도 빠짐없이 구현한다.
  // 원칙 4. 모든 구현 함수는 순수함수이다. 부작용이 없어야 한다. 메소드가 포함된 객체를 redux state로 만드는 것이 허락하지 않으므로, 데이터와 함수를 분리시키는 방법을 사용했다.
  // 원칙 5. responseData, requestData역시 정해진 타입이 있다. 외부 생성자로 객체를 만드는 것이 추천되나, 번거로울 시 생성하는 객체마다 타입을 일치시켜 생성하는 것을 허용한다.
  // 원칙 6. gameState는 redux 에서의 game을 말한다. 
  // 그 이외에 다른 편법은 허용되지 않는다.

  // 원칙을 잘 모르겠으면 아예 건들지 않는다. 타인에게 도움을 구한다.


  // 빈 게임 데이터(game)를 생성한다.
  // 반드시 리턴값이 존재해야 하고, gameDate와 같은 게임타입이여야 한다.
  createGameData(gameState) {
    return {};
  }

  // 빈 게임 결과 데이터(gameResult)를 생성한다.
  // 반드시 리턴값이 존재해야 하고, gameResult와 같은 게임타입이여야 한다.
  createGameResult(gameState) {
    return {};
  }

  // 게임 생성 결과를 처리한다.
  // 게임 생성에 성공하면 View 에 해당 내용을 갱신한다.
  // 게임 생성에 실패하면 예외를 내놓고, 예외 처리는 View에서 진행하고 여기서 하지 않는다.
  // 리턴값에 변동된 gameData을 리턴한다.
  onCreated(gameState, statusCode, responseData) {
    return gameState.gameData;
  }

  // 게임 도중 라즈베리파이서버의 화면 변경 요청을 처리한다.
  // 변경할 내용을 받아 화면을 변경시킨다.
  // 변경에 실패했을 경우 예외를 내놓는다. 예외 처리는 View에서 진행하고 여기서 하지 않는다.
  // 리턴값에 변동된 gameData을 리턴한다.
  onChanged(gameState, requestData) {
    return gameState.gameData;
  }

  // 게임이 강제적으로 종료되었을 경우를 처리한다.
  // 클라이언트의 요청(긴급종료요청) 또는 서버에 요청(긴급종료요청)에 의해 발생 된다.
  // 서버 요청인 경우 statusCode는 항상 SUCESS로 가정한다.
  // 게임이 시작되기 이전상태로 화면을 변경시킨다.
  // 변경에 실패했을 경우 예외를 내놓는다. 예외 처리는 View에서 진행하고 여기서 하지 않는다.
  // 리턴값에 변동된 gameData을 리턴한다.
  onDestroyed(gameState, statusCode, data) {
    return gameState.gameData;
  }

  // 게임이 성공적으로 완료되었을 경우를 처리한다.
  // 게임이 끝난 이후 결과창을 보여주는 화면으로 변경시킨다.
  // 변경에 실패했을 경우 예외를 내놓는다. 예외 처리는 View에서 진행하고 여기서 하지 않는다.
  // 리턴값에 변동된 gameData을 리턴한다.
  onCompleted(gameState, requestData) {
    return gameState.gameData;
  }
}

export default GameDataHandler