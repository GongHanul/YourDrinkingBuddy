import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function Game1() {
  const location = useLocation();
  const Playercnt = location.state.cnt

  const game = useSelector((state)=>state.game);
  const game1 = game.gameData
  const players = game.playerViewPos;

  // if (game.gameState !== GameState.PLAY) {
  //   return (<><TopDiv> 게임 생성 중입니다. 기다려주세요... </TopDiv></>)
  // } else {
  return (
    <>
    <TopDiv>
      {players.map(function (e, i) {
        return (
      
      <Display index={i}>
      <Player>Player : {game1[i].playerId}</Player>
      </Display>
    )
    })}
    </TopDiv>
    </>
    )
  // }
}
const Player = styled.div`
  display : flex;
`
const TopDiv = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%
`
const Display = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px #063C69, 0 1px 2px #063C69 inset;
  box-sizing: border-box;
`
export default Game1