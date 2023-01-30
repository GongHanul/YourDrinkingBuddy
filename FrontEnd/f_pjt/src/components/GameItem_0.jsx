import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { React, useState } from 'react';

function GameItem() {
  // const [game, setGame] = useState([{title: '심장 박동 게임', color: '#063C69' },{title: '심장 박자 게임' , color:'#0E538B'},{title: '심장 자동 게임' , color:'#1966A5'},{title: '심장 수동 게임', color:'#F4E5B2'},{title: '심장 박수 게임', color:'#EDD582'},{title: '심장 소리 게임', color:'#D0BB70'}])
  const [isFlipped, setIsFlipped] = useState(false);
  
  
  return (
    <>
      <ReactCardFlip
      className="characterCard"
      isFlipped={isFlipped}
      flipDirection="horizontal"
      >
      <CardFront
        onClick={() => setIsFlipped((prev) => !prev)}
        className="CardFront"
      >
        <Img src="img/heart.png"/>
        <Title># 심장 박동 게임</Title>
      </CardFront>
      <CardBack
        onClick={() => setIsFlipped((prev) => !prev)}
        className="CardBack"
      >
        {/* This is the back of the card. */}
        <Rule># 일정 심박수에</Rule>
        <Rule>도착하면</Rule>
        <Rule>벌칙</Rule>
        <Rule> </Rule>
        <Rule>게임 전 개인 심박수 측정</Rule>
        <Start>START!</Start>
      </CardBack>
      </ReactCardFlip>
    </>
  )
}
const Start = styled.button`
  margin: 2vh;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #004680;
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 3vh;
  padding : 1vh 3vh 1vh 2.5vh;
  &:hover {
    color: red;
  }
`
const Card = styled.div`
  display: flex;
  height: 50vh;
  background: #063C69;
  flex: 1 1 30%;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
  `
const CardFront = styled.div`
  height: 50vh;
  background: #063C69;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  `
const CardBack = styled.div`
  background: #063C69;
  display: flex;
  flex: 1 1 30%;
  flex-direction: column;
  align-content: stretch;
  height: 50vh;
  align-content: "space-between";
  align-items: center ;
  justify-content: center;
`
const Img = styled.img`
  height: 25vh;
  margin: 5vh;
`
const Title = styled.div`
  color : #ffffff;
  font-size: 3vh;
`
const Rule = styled.div`
  color : #ffffff;
  font-size: 3vh;
`
export default GameItem