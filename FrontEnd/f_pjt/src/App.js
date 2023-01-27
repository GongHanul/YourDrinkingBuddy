import React from "react";
import styled from "styled-components";
import {
  Routes,
  Route,
  Link } from "react-router-dom";

import Sidebar from "./SideNav";

import Drink from "./pages/Drink";
import Game from "./pages/Game";
import Warning from "./pages/Warning";
import Cocktail from "./pages/Cocktail";
import Splash from "./pages/Splash";

import { useState } from "react";



function App() {
    const [ visible, setVisible ] = useState(true);
    let timerId = setTimeout(() => {
      setVisible(false)}, 1000);
        
    return(

    <>
    {visible && 
      <img alt ="splash" src="img/splash.jpg"></img>}

    {!visible && <Main> 
      {/* clearTimeout(timerId) 실행 시키는 로직 생각하기  */}
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Warning />} />
        <Route path="/game" element={<Game />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/cocktail" element={<Cocktail />} />
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