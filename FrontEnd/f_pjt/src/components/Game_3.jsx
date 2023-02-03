import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { React, useState } from 'react';
import { NavLink } from "react-router-dom";

function GameList() {
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
    {/* This is the front of the card. */}
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
    <br/>
    <Rule2>화면에 나오는 숫자 확인</Rule2>
    <NavStyle to="/gameitem3" >START!</NavStyle>
  </CardBack>
  </ReactCardFlip>
  </>
  )
}
const NavStyle = styled(NavLink)`
  margin: 4vh 0 0 0 ;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #063C69;
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
const CardFront = styled.div`
  background: #1966A5;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height : 50vh;`
const CardBack = styled.div`
  background: #1966A5;
  display: flex;
  flex: 1 1 30%;
  flex-direction: column;
  align-content: stretch;
  align-content: "space-between";
  align-items: center ;
  justify-content: center;
  height : 50vh;
  padding: 0 4vh;
`
const Img = styled.img`
  height: 25vh;
  margin: 5vh;
`
const Title = styled.div`
  color : #ffffff;
  font-size: 4vh;
`
const Rule1 = styled.div`
  color : #ffffff;
  font-size: 4vh;
`
const Rule2 = styled.div`
  color : #ffffff;
  font-size: 4vh;
`
export default GameList