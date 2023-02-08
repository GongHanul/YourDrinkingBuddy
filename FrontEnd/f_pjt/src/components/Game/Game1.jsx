import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function Game1() {
  const location = useLocation();
  const Playercnt = location.state.cnt
  const img = ['img/game1/game1_1.png', 'img/game1/game1_2.png']

  const game = useSelector((state)=>state.game);
  const game1 = game.gameData
  const players = game.playerViewPos;

  // if (game.gameState !== GameState.PLAY) {
  //   return (<><TopDiv> 게임 생성 중입니다. 기다려주세요... </TopDiv></>)
  // } else {
  return (
  <>
  <Full>
  <Display>
      {players.map(function (e, i) {
        return (
      <PlayerDisplay index={i}>
      <Player>Player : {game1[i].playerId}</Player>
      {/* { game1[i].cnt >= 45 &&  */}
      <IMG 
      src={img[game1[i].cnt%2]}></IMG>
      <p>{game1[i].cnt}</p>
      {/* } */}
      </PlayerDisplay>
    )
    })}
  </Display>
  <Side>
    <Quit>QUIT</Quit>
  </Side>
  </Full>
    </>
    )
  // }
}
const Player = styled.div`
  display : flex;
`
const IMG = styled.img`
  justify-content: center;
  align-items: center ;
`

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
const Quit = styled.div`
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
const PlayerDisplay = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px #063C69, 0 1px 2px #063C69 inset;
  box-sizing: border-box;
  background-image: url(${'img/game1/whale.gif'});
`
export default Game1