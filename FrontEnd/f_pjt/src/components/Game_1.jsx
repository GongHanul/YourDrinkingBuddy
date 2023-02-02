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
    <Img src="img/heart.png"/>
    <Title># 흥분 하지마!</Title>
  </CardFront>
  <CardBack
    onClick={() => setIsFlipped((prev) => !prev)}
  >
    {/* This is the back of the card. */}
    {/* <Rule1># 일정 심박수를</Rule1>
    <Rule1>넘어가면</Rule1>
    <Rule1>벌칙</Rule1> */}
    <Rule1># 최저, 최대,</Rule1>
    <Rule1> 평균, 갭 차이</Rule1>
    <Rule1>선택하여 벌칙</Rule1>
    <br/>
    <Rule2>게임 전 개인 심박수 측정</Rule2>
    <NavStyle to="/gameitem1" >START!</NavStyle>
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
  color : #1966A5;
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
const CardFront = styled.div`
  background: #063C69;
  display: flex;
  align-items: center ;
  justify-content: center;
  flex-direction: column;
  height : 50vh;
  `
const CardBack = styled.div`
  background: #063C69;
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
  font-family: 'Do Hyeon', sans-serif;
`
export default GameList