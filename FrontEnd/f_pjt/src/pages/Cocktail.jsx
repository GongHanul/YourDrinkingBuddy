import styled from "styled-components";
import { React, useState } from 'react';
import BeverageItem from "../components/BeverageItem";


function Cocktail() {  
  let [Recipes, setRecipe] = useState(['SOMAC', 'SOTONIC', 'MAKSA', 'HI'])
  let [Pump, setPump] = useState([0,1,2,3])
  return(
    <Maindiv>
      <Topdiv>
          { Recipes.map(function(e, i){
          return (<Recipe>{ Recipes[i] }</Recipe>)
          })}
      </Topdiv>
      <Bottomdiv>
        { Pump.map(function(e, i){
          return (<BeverageItem/>)
        })}
      </Bottomdiv>
    </Maindiv>
)
}
const Maindiv = styled.body`
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
`
const Topdiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin : auto 0;
  `
const Bottomdiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin : auto 0;
`
const Recipe = styled.div`
  border-radius: 2vh;
  width: 25vh;
  box-shadow: inset 0 0 5px gray;
  box-shadow: -1px -1px 30px 1px lightgreen, 1px 1px 30px 1px blue;
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 4vh;
  color: #004680;
  box-sizing: border-box;
  display: flex;
  align-items: center ;
  justify-content: space-evenly;
  padding: 2vh;
  `

export default Cocktail