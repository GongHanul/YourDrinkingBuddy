import styled from "styled-components";
import { React, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faArrowRightLong} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createGame, initializePlayerViewPos, preserveGameDataHandler, setGameDataHandler, setGameStatePlay, setGameStateReady } from "../../store";
import gameEnv from './GameEnv';
import Swal from 'sweetalert2'

function GamePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id
  const Playercnt = location.state.cnt
  const GameId = `/game${id}`
  const game = useSelector((state) => state.game)
  const img = ['img/gameplay/덜루기.gif','img/gameplay/뮤.gif','img/gameplay/이상해씨.gif','img/gameplay/피카츄.gif', 'img/gameplay/파치리스.gif', 'img/gameplay/잠만보.gif']
  const bgcolor = [' #F7CAC9', '#878586', ' #f0eee9', '#d0e1ff']
  const dispatch = useDispatch();

  // 피셔-예이츠 셔플 (편향적이지 않은 무작위 값을 뽑기위해 사용)
  const shuffle = (array) => {
    for(let index = array.length -1 ; index > 0; index--){
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index +1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] =temporary;
    }
    return array
  }
  shuffle(img)
  shuffle(bgcolor)



  const start = () => {
    console.log(game.playerCount)
    if( game.playerCount < Playercnt ){
      // alert(`플레이어 모자릅니다. 현재 플레이어 수 : ${game.playerCount}, 목표 플레이어 수 : ${Playercnt}`)
      Swal.fire(
        '플레이어수가 모자릅니다.',
        `| 현재 플레이어 수 : ${game.playerCount} | 목표 플레이어 수 : ${Playercnt} |`,
        'question'
      )
    } else {
      console.log(gameEnv)
      preserveGameDataHandler(new gameEnv[id].handler());
      dispatch(setGameDataHandler())
      dispatch(createGame({playerCount : Playercnt}))
      navigate(GameId, { state: { cnt : Playercnt} });
    }
  }

  const back = () => {
    navigate('/game');}
  
  useEffect(() => {
    dispatch(setGameStateReady())
  } ,[])

  useEffect(() => {
    dispatch(initializePlayerViewPos(Playercnt));
  }, [game.playerStatus])

  console.log(GameId)
  console.log(Playercnt)
  return (
  <>
  <Full>
  <Display>
  { game.playerViewPos.map(function(e, i){
    return (
    <Ready index={i} style={{backgroundColor : `${bgcolor[i]}`}}>
      Player {e} is Ready
      <Img src={img[i]}></Img>
    </Ready>)
  })}
  </Display>
  <Side>
  <Start onClick={back}><FontAwesomeIcon icon= {faArrowLeftLong}/> BACK</Start>
  <Start onClick={start}>START <FontAwesomeIcon icon= {faArrowRightLong}/></Start>
  </Side>
  </Full>
  </>
  )
}

const Img = styled.img`
  justify-content: center;
  align-items: center ;
  height : 18vh;
  margin-top: 3vh;
`

const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background :#ffecec ;
  `
const Display = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%;
  height : 85%;
`
const Side = styled.div`
  display : flex;
  justify-content: space-evenly;
  width : 100%;
  height : 15%;
`
const Ready = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 6vh;
  font-family: 'Jua', sans-serif;
  font-weight: bold;
`

const Start = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #4b76c0 ;
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.3vh;
  &:hover {
    color: #da341f;
  }
`
export default GamePlay