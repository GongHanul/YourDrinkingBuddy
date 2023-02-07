import styled from "styled-components";
import { React, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faArrowRightLong} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createGame, initializePlayerViewPos, setGameStateReady } from "../../store";

function GamePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id
  const Playercnt = location.state.cnt
  const GameId = `/game${id}`
  const game = useSelector((state) => state.game)

  const dispatch = useDispatch();

  const start = () => {
    console.log(game.playerCount)
    if( game.playerCount < Playercnt ){
      alert(`플레이어 모자릅니다. 현재 플레이어 수 : ${game.playerCount}, 목표 플레이어 수 : ${Playercnt}`)
    }else{
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
    <Ready index={i}>
      Player: {e} is Ready.
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
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
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
  padding : 2vh;
  width : 100%;
  height : 10%;

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
  box-shadow: 0 1px 2px #474747, 0 1px 2px #474747 inset;
  box-sizing: border-box;
`
const Start = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #1966A5;
  font-size: 3vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.3vh;
  &:hover {
    color: red;
  }
`
export default GamePlay