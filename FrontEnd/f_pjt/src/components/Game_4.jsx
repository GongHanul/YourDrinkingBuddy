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
    <Img src="img/sound_black.png"/>
    <Title># 누가 더 시끄럽나!</Title>
  </CardFront>
  <CardBack
    onClick={() => setIsFlipped((prev) => !prev)}
  >
    {/* This is the back of the card. */}
    <Rule1># 각 순서에 따라서</Rule1>
    <Rule1>가장 큰 데시벨이</Rule1>
    <Rule1>나온사람이 벌칙!</Rule1>
    <br />
    <Rule2>눈치껏 조용한 타이밍 시작</Rule2>
    <NavStyle to="/gameitem4" >START!</NavStyle>
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
  color : #D0BB70;
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
  background: #F4E5B2;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: black;
  height : 50vh;
  `
const CardBack = styled.div`
  background: #F4E5B2;
  display: flex;
  flex: 1 1 30%;
  flex-direction: column;
  align-content: stretch;
  align-content: "space-between";
  align-items: center ;
  height : 50vh;
  justify-content: center;
  padding: 0 4vh;
`
const Img = styled.img`
  height: 23vh;
  margin: 6vh;
`
const Title = styled.div`
  color : black;
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
`
const Rule1 = styled.div`
  color : black;
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
`
const Rule2 = styled.div`
  color : black;
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
`
export default GameList