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
import GameItem1 from "./components/Game_1_Item";
import GameItem2 from "./components/Game_2_Item";
import GameItem3 from "./components/Game_3_Item";
import GameItem4 from "./components/Game_4_Item";
import GameItem5 from "./components/Game_5_Item";
import GameItem6 from "./components/Game_6_Item";

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

    {!visible && <MainBody> 
      {/* clearTimeout(timerId) 실행 시키는 로직 생각하기  */}
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/gameitem1" element={<GameItem1 />} />
        <Route path="/gameitem2" element={<GameItem2 />} />
        <Route path="/gameitem3" element={<GameItem3 />} />
        <Route path="/gameitem4" element={<GameItem4 />} />
        <Route path="/gameitem5" element={<GameItem5 />} />
        <Route path="/gameitem6" element={<GameItem6 />} />
      </Routes>
    </MainBody>}
    </>
  )
}

const MainBody = styled.div`
  display: flex;
`

export default App;