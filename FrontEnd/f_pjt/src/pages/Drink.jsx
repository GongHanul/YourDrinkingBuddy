import styled from "styled-components";
import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from "@fortawesome/free-solid-svg-icons"
import BeverageItem from "../components/BeverageItem";


function Drink() {  
  let [Recipes, setRecipe] = useState(['쏘맥', '소백산맥', '막소사'])
  let [Pump, setPump] = useState([0,1,2,3])
  return(
    <Maindiv>
      <Topdiv>
          { Recipes.map(function(e, i){
          return (<RecipeItem>{ Recipes[i] }</RecipeItem>)
          })}
        <Reset><FontAwesomeIcon icon= { faRetweet } /></Reset>
      </Topdiv>
      <Bottomdiv>
        { Pump.map(function(e, i){
          return (<BeverageItem index={i}/>)
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
const Reset = styled.div`
  align-items: center ;
  justify-content: center;
  color: #004680;
  font-size: 8vh;
  &:link {
    transition : 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: red;
  }
  &.active {
    color: 	Goldenrod;
    position: relative;
    top: 1vh;
    border-bottom: 1vh solid 	Goldenrod;
  }
`
const RecipeItem = styled.div`
  border-radius: 2vh;
  width: 25vh;
  box-shadow: inset 0 0 5px gray;
  box-shadow: -1px -1px 30px 1px #ffffff , 1px 1px 30px 1px blue ;
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 4vh;
  color: #004680;
  box-sizing: border-box;
  display: flex;
  align-items: center ;
  justify-content: space-evenly;
  padding: 2vh;
  font-family: 'Do Hyeon', sans-serif;
  font-weight : bold;
  `

export default Drink