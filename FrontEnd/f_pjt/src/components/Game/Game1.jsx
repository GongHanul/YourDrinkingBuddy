import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { /*changeGame1Data,*/ preserveGameDataHandler, createGame, setGameStatePlay, setGameDataHandler, GameState } from "../../store.js";
import ClickGameDataHandler from './../../ClickGameDataHandler';

function Game1() {
  const location = useLocation();
  // const Playercnt = location.state.cnt

  const game = useSelector((state)=>state.game);
  const game1 = game.gameData
  const players = game.playerViewPos;
  const img1 = ['img/game1/1-1.png', 'img/game1/1-2.png', 'img/game1/1-3.png']
  const img2 = ['img/game1/2-1.png', 'img/game1/2-2.png']
  const img3 = ['img/game1/3-1.png', 'img/game1/3-2.png']
  const img4 = ['img/game1/4-1.png', 'img/game1/4-2.png']
  
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
      { game1[i].cnt < 15 &&<IMG 
      // onClick={()=>{
      //   dispatch(changeGame1Data({
      //     idx : i
      //   }))
      // }}
      src={img1[game1[i].cnt%3]}></IMG>}
      { game1[i].cnt < 30 && game1[i].cnt >= 15 && <IMG 
      // onClick={()=>{
      //   dispatch(changeGame1Data({
      //     idx : i
      //   }))
      // }}
      src={img2[game1[i].cnt%2]}></IMG>}
      { game1[i].cnt >= 30 && game1[i].cnt < 45 && <IMG 
      // onClick={()=>{
      //   dispatch(changeGame1Data({
      //     idx : i
      //   }))
      // }}
      src={img3[game1[i].cnt%2]}></IMG>}
      { game1[i].cnt >= 45 && <IMG 
      // onClick={()=>{
      //   dispatch(changeGame1Data({
      //     idx : i
      //   }))
      // }}
      src={img4[game1[i].cnt%2]}></IMG>}
      <SCORE>{game1[i].cnt}</SCORE>
      </Display>
    )
    })}
    </TopDiv>
    </>
    )
  // }
}

const SCORE = styled.div`
  font-family: 'Silkscreen', cursive;
  font-size: 20vh;
`

const IMG = styled.img`
  justify-content: center;
  align-items: center ;
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

const Player = styled.div`
  display : flex;
`
export default Game1