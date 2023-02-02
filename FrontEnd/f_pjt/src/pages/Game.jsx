import styled from "styled-components";
import { React, useState } from 'react';
import Game1 from "../components/Game_1";
import Game2 from "../components/Game_2";
import Game3 from "../components/Game_3";
import Game4 from "../components/Game_4";
import Game5 from "../components/Game_5";
import Game6 from "../components/Game_6";

function Game() {
  return (
  <>
    <Gamee>
    <Game1></Game1>
    <Game2></Game2>
    <Game3></Game3>
    <Game4></Game4>
    <Game5></Game5>
    <Game6></Game6>
    </Gamee>
  </>
  )
}
const Gamee = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex : 1 1 30%;
`
export default Game