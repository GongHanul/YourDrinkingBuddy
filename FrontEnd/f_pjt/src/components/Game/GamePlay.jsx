import styled from "styled-components";
import { React, useState } from 'react';
import GameReady from './GameReady';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function GamePlay() {
  const location = useLocation();
  const id = location.state.id
  const GameId = `/game${id}`
  console.log(GameId)
  return (
  <>
  <GameReady></GameReady>
  <NavStyle to={GameId} >START!</NavStyle>
  </>
  )
}

const NavStyle = styled(NavLink)`
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