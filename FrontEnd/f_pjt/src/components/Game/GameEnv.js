
import HeartRateGameDataHandler from './../../handler/HeartRateGameDataHandler'
import ClickGameDataHandler from './../../handler/ClickGameDataHandler';

const gameEnv = {
  1: { handler: HeartRateGameDataHandler },
  2: { handler: ClickGameDataHandler },
  3: { handler: ClickGameDataHandler },
  4: { handler: ClickGameDataHandler },
  5: { handler: ClickGameDataHandler },
  6: { handler: ClickGameDataHandler },
}

export default gameEnv