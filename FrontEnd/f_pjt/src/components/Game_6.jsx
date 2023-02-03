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
    <Img src="img/joystick_black.png"/>
    <Title># 60초는 언제?!</Title>
  </CardFront>
  <CardBack
    onClick={() => setIsFlipped((prev) => !prev)}
  >
    {/* This is the back of the card. */}
    <Rule1># START 누른 후</Rule1>
    <Rule1> 60초 후 버튼 클릭!</Rule1>
    <Rule1>차이가 젤 큰 사람 벌칙!</Rule1>
    <br />
    <Rule2>60초를 맞춰라!</Rule2>
    <NavStyle to="/gameitem6" >START!</NavStyle>
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
  color : #F4E5B2;
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
  background: #D0BB70;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height : 50vh;
`
const CardBack = styled.div`
  background: #D0BB70;
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
  color : black;
  font-size: 4vh;
`
const Rule1 = styled.div`
  color : black;
  font-size: 4vh;
`
const Rule2 = styled.div`
  color : black;
  font-size: 4vh;
`
export default GameList