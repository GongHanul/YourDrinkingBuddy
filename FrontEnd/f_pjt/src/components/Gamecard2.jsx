import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createGame, preserveGameDataHandler, setGameDataHandler, setGameStateReady } from "../store";
import gameEnv from "./Game/GameEnv";

function GameList(props) {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();

  const start = () => {
    dispatch(setGameStateReady())
    preserveGameDataHandler(new gameEnv[props.id].handler());
    dispatch(setGameDataHandler())
    dispatch(createGame({playerCount : 0}))
    navigate(`/game${props.id}`);}

const Ready = styled.div`
  margin: 4vh 0 0 0 ;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : ${props.ready};
  font-weight : bold;
  font-style: normal;
  font-size: 3vh;
  padding : 1.2vh 3vh 1vh;
  font-family: 'Jua', sans-serif;
  filter: drop-shadow(0.3vh 0.3vh 0.1vh rgb(0 0 0 / 0.3));
  &:hover {
    color: red;
    filter: drop-shadow(0.6vh 0.6vh 0.3vh rgb(0 0 0 / 0.6));
  }
`
const CardFront = styled.div`
  background: ${props.background};
  display: flex;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
  height : 50vh;
  `
const CardBack = styled.div`
  background: ${props.background};
  display: flex;
  /* flex: 1 1 30%; */
  flex-direction: column;
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
  color : ${props.font};
  font-size: 4vh;
  filter: drop-shadow(0.3vh 0.3vh 0.1vh rgb(0 0 0 / 0.5));
`
const Rule = styled.div`
  color : ${props.font};
  font-size: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0.3vh 0.3vh 0.1vh rgb(0 0 0 / 0.5));
`
const Rule1 = styled.div`
`
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
    <Img src={props.src} />
    <Title>{props.title}</Title>
  </CardFront>
  <CardBack
  > <Rule onClick={() => setIsFlipped((prev) => !prev)}>
    <Rule1>{props.rule1}</Rule1>
    <Rule1>{props.rule2}</Rule1>
    <Rule1>{props.rule3}</Rule1>
    <br/>
    <Rule1>{props.rule4}</Rule1>
    </Rule>
    <Ready onClick={start}>START!</Ready>
  </CardBack>
  </ReactCardFlip>
  </>
  )
}

export default GameList