import styled from "styled-components";
import { React, useState } from 'react';
import GameReady from './GameReady';
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';

function GamePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id
  const Playercnt = location.state.cnt
  const GameId = `/game${id}`
  const start = () => {
    navigate(GameId, { state: { cnt : Playercnt} });}

  console.log(GameId)
  console.log(Playercnt)
  return (
  <>
  <GameReady cnt = {Playercnt} ></GameReady>
  <Start onClick={start} >START!</Start>
  </>
  )
}

const Start = styled.div`
  display : flex;
  align-items : center;
  margin: 4vh 0 0 0 ;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #1966A5;
  font-weight : bold;
  font-style: normal;
  font-size: 3vh;
  padding : 1vh 3vh 1vh 2.5vh;
  &:link {
    text-decoration: none;
  }
  &:hover {
    color: red;
  }
`
export default GamePlay