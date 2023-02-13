
import HeartRateGameDataHandler from './../../handler/HeartRateGameDataHandler'
import ClickGameDataHandler from './../../handler/ClickGameDataHandler';
import SoundGameDataHandler from './../../handler/SoundGameDataHandler';
import TimeEstimateGameDataHandler from '../../handler/TimeEstimateGameDataHander';


const gameEnv = {
  1: { handler: HeartRateGameDataHandler },
  2: { handler: ClickGameDataHandler },
  3: { handler: ClickGameDataHandler },
  4: { handler: SoundGameDataHandler },
  5: { handler: ClickGameDataHandler },
  6: { handler: TimeEstimateGameDataHandler },
}

export default gameEnv