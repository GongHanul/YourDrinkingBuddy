import AbstractGameDataHandler from './AbstractGameDataHandler'


// unit*min 이상   unit*max 이하로 설정한다.
const min = 200
const max = 350

const unit = 1



class FillBeverageGame extends AbstractGameDataHandler {

  getGameId() {
    return 2;
  }

  // minUnit ~ maxUnit-1
  // == 
  // minUnit + ( 0 ~ maxUnit-1-minUnit) 
  setRandom(minUnit, maxUnit, unit){
    return parseInt(((Math.random() * (maxUnit-minUnit+1)) + minUnit ) * unit);
  }

  createGameData(gameState) {
    let result = {weight: 0, limit: this.setRandom(min,max,unit)};
    return result;
  }

  onChanged(gameState, requestData) {
    let gameData = Object.assign({},gameState.gameData);
    gameData.weight = requestData.gameData.cnt;
    return gameData;
  }

  createGameResult(gameState){
    return gameState.gameData;
  }

}

export default FillBeverageGame