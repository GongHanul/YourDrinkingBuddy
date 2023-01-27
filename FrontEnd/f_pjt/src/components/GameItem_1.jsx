import styled from "styled-components";
import { React, useState } from 'react';

function GameItem() {
  // const [game, setGame] = useState([{title: '심장 박동 게임', color: '#063C69' },{title: '심장 박자 게임' , color:'#0E538B'},{title: '심장 자동 게임' , color:'#1966A5'},{title: '심장 수동 게임', color:'#F4E5B2'},{title: '심장 박수 게임', color:'#EDD582'},{title: '심장 소리 게임', color:'#D0BB70'}])
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
  background: #063C69;
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
  color : #ffffff;
  font-size: 3vh;


`
export default GameItem