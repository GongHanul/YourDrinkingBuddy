
import HeartRateGameDataHandler from './../../handler/HeartRateGameDataHandler'
import ClickGameDataHandler from './../../handler/ClickGameDataHandler';
import SoundGameDataHandler from './../../handler/SoundGameDataHandler';
import TimeEstimateGameDataHandler from '../../handler/TimeEstimateGameDataHander';
import FillBeverageGame from '../../handler/FillBeverageGame';


const gameEnv = {
  1: { handler: HeartRateGameDataHandler },
  2: { handler: FillBeverageGame },
  3: { handler: ClickGameDataHandler },
  4: { handler: SoundGameDataHandler },
  5: { handler: ClickGameDataHandler },
  6: { handler: TimeEstimateGameDataHandler },
}

export default gameEnv