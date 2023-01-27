import styled from "styled-components";
import { React, useState } from 'react';

function GameItem() {
  return (
      <>
      <GameList><Img src="img/joystick_black.png"/>
        <Title># 기억력 게임</Title>
      </GameList>
  </>
  )
}

const GameList = styled.div`
  height: 50vh;
  background: #F4E5B2;
  flex: 1 1 30%;
  border:none;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  `
const Img = styled.img`
  height: 25vh;
  margin: 5vh;
`
const Title = styled.div`
  color : #000000;
  font-size: 3vh;


`
export default GameItem