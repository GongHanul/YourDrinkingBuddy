import styled from "styled-components";
import { React, useState } from 'react';

function GameItem() {
  return (
      <>
      <GameList><Img src="img/heart.png"/>
        <Title># 심장 박동 게임</Title>
      </GameList>
  </>
  )
}

const GameList = styled.div`
  height: 50vh;
  background: #EDD582;
  flex: 1 1 30%;
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
  color : #ffffff;
  font-size: 3vh;


`
export default GameItem