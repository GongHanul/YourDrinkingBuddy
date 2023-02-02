import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { React, useState } from 'react';
import { NavLink } from "react-router-dom";

function GameList() {
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
    >
      <Img src="img/joystick.png"/>
      <Title># 누가 더 빨리! 많이!</Title>
    </CardFront>
    <CardBack
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      {/* This is the back of the card. */}
      <Rule1># 조이패드에 있는</Rule1>
      <Rule1>4개의 버튼을 마구마구 눌러라!</Rule1>
      <Rule1>적게 나온 사람이 벌칙!</Rule1>
      <Rule2>화면에 나오는 숫자 확인</Rule2>
      <NavStyle to="/gameitem3" >START!</NavStyle>
      {/* <Start>START!</Start> */}
    </CardBack>
    </ReactCardFlip>
  </>
  )
}
const NavStyle = styled(NavLink)`
  position : absolute;
  margin: 4vh 0 0 0 ;
  bottom : 2em;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #004680;
  font-family: 'Play', sans-serif;
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
  width: 30vw;
  background: #1966A5;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  `
const CardBack = styled.div`
  width: 30vw;
  background: #1966A5;
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
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
`
const Rule1 = styled.div`
  color : #ffffff;
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
`
const Rule2 = styled.div`
  color : #ffffff;
  font-size: 4vh;
  margin: 1em 0 1em 0 ;
  font-family: 'Do Hyeon', sans-serif;
`
export default GameList