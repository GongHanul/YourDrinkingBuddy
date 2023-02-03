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
    <Img src="img/gram.png"/>
    <Title># 술 넘기지마!</Title>
  </CardFront>
  <CardBack
    onClick={() => setIsFlipped((prev) => !prev)}
  >
    {/* This is the back of the card. */}
    <Rule1># 임의의 랜덤값을 부여 후</Rule1>
    <Rule1>돌아가면서 술을 따르며</Rule1>
    <Rule1>랜덤값을 넘으면 벌칙!</Rule1>
    <br/>
    <Rule2>게임 전 잔을 무게 센서에 올리기</Rule2>
    <NavStyle to="/gameitem2" >START!</NavStyle>
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
  color : #004680;
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
  background: #0E538B;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height : 50vh;
  `
const CardBack = styled.div`
  background: #0E538B;
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