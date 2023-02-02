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
    <Flexdiv><Game1></Game1></Flexdiv>
    <Flexdiv><Game2></Game2></Flexdiv>
    <Flexdiv><Game3></Game3></Flexdiv>
    <Flexdiv><Game4></Game4></Flexdiv>
    <Flexdiv><Game5></Game5></Flexdiv>
    <Flexdiv><Game6></Game6></Flexdiv>
    </Gamee>
  </>
  )
}
const Gamee = styled.div`
  display: flex;
  flex-wrap: wrap;
  `
const Flexdiv = styled.div`
  flex: 1 1 30%;
`

export default Game