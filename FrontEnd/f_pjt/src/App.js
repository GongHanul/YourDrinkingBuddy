import React from "react";
import styled from "styled-components";
import {
  Routes,
  Route,
  Link } from "react-router-dom";

import Sidebar from "./SideNav";

import Game from "./pages/Game";
import Drink from "./pages/Drink";
import Recipe from "./pages/Recipe";
import Warning from "./pages/Warning";
import Splash from "./pages/Splash";

import { useState } from "react";



function App() {
    const [ visible, setVisible ] = useState(true);
    let timerId = setTimeout(() => {
      setVisible(false)}, 1000);
        
    return(

    <>
    {/* {visible && 
      <img alt ="splash" src="img/splash.jpg"></img>} */}
    {visible && 
      <Splash/>}

    {!visible && <Main> 
      {/* clearTimeout(timerId) 실행 시키는 로직 생각하기  */}
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Warning />} />
        <Route path="/game" element={<Game />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/splash" element={<Splash />} />
      </Routes>
    </Main>}
    </>
  )
}

const Main = styled.div`
  display: flex;
`

export default App;