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
    <Img src="img/gram_black.png"/>
    <Title># 무게가 어느정도지?</Title>
  </CardFront>
  <CardBack
    onClick={() => setIsFlipped((prev) => !prev)}
  >
    {/* This is the back of the card. */}
    <Rule1># 한명씩 돌아가면서</Rule1>
    <Rule1>물건을 올려 랜덤값에서</Rule1>
    <Rule1> 제일 먼 사람이 벌칙!</Rule1>
    <br />
    <Rule2>돌아가면서 무게 측정!</Rule2>
    <NavStyle to="/gameitem5" >START!</NavStyle>
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
  color : #EDD582;
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
  background: #EDD582;
  flex: 1 1 30%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height : 50vh;
`
const CardBack = styled.div`
  background: #EDD582;
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