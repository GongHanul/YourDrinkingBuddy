import styled from "styled-components";
import { React, useState } from 'react';
import GameItem1 from "../components/GameItem_1";
import GameItem2 from "../components/GameItem_2";
import GameItem3 from "../components/GameItem_3";
import GameItem4 from "../components/GameItem_4";
import GameItem5 from "../components/GameItem_5";
import GameItem6 from "../components/GameItem_6";

function Game() {
    return (
        <>
        <Gamee>
        <GameItem1></GameItem1>
        <GameItem2></GameItem2>
        <GameItem3></GameItem3>
        <GameItem4></GameItem4>
        <GameItem5></GameItem5>
        <GameItem6></GameItem6>
        </Gamee>
    </>
    )
}
const Gamee = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export default Game