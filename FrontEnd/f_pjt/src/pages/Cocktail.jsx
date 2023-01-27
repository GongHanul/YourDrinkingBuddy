import styled from "styled-components";
import { React, useState } from 'react';
import BeverageItem from "../components/BeverageItem";


function Cocktail() {  
  let [Recipes, setRecipe] = useState(['SOMAC', 'SOTONIC', 'MAKSA', 'HI'])
  let [Pump, setPump] = useState([0,1,2,3])
  return(

  <>
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
  </>
)
}
const Maindiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const Topdiv = styled.div`
  display: flex;
  margin: auto;
`
const Bottomdiv = styled.div`
  display: flex;
  margin: auto;

`
const Recipe = styled.div`
  border-radius: 2vh;
  width: 25vh;
  box-shadow: inset 0 0 5px gray;
  box-shadow: -5px -5px 30px 5px lightgreen, 5px 5px 30px 5px blue;
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 5vh;
  color: #004680;
  box-sizing: border-box;
  padding: 2vh;
  margin: auto 4vh;
  display: flex;
  align-items: center ;
  justify-content: space-evenly;
`

export default Cocktail