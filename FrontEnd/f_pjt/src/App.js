import React from "react";
import styled from "styled-components";
import {
  Routes,
  Route,
  Link } from "react-router-dom";

import Main from "./pages/Main";
import Game from "./pages/Game";
import Drink from "./pages/Drink";
import Sidebar from "./SideNav";
import Recipe from "./pages/Recipe";
import Splash from "./pages/Splash";
import GamePlay from "./components/Game/GamePlay";
import Game1 from "./components/Game/Game1";
import Game2 from "./components/Game/Game2";
import Game3 from "./components/Game/Game3";
import Game4 from "./components/Game/Game4";
import Game5 from "./components/Game/Game5";
import Game6 from "./components/Game/Game6";

import { useState } from "react";



function App() {
    const [ visible, setVisible ] = useState(true);
    let timerId = setTimeout(() => {
      setVisible(false)}, 2500);
        
    return(

    <>
    {/* {visible && 
      <img alt ="splash" src="img/splash.jpg"></img>} */}
    {visible && 
      <Splash/>}

    {!visible && <MainBody> 
      {/* clearTimeout(timerId) 실행 시키는 로직 생각하기  */}
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/gameplay" element={<GamePlay />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />
        <Route path="/game5" element={<Game5 />} />
        <Route path="/game6" element={<Game6 />} />
      </Routes>
    </MainBody>}
    </>
  )
}

const MainBody = styled.div`
  display: flex;
`

export default App;