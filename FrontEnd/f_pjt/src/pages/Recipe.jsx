import styled from "styled-components";
import { React, useState } from 'react';
import { useSelector } from "react-redux"


function Recipe() {  
  const recipes = useSelector((state)=> state.recipe)
  console.log(recipes)
  return(
    <><Body>
    { recipes.map(function(e, i){
        return (<Name>{ recipes[i].recipe_name }</Name>
            )
        })}
    </Body>
    {/* {recipes.map(function(e,i){
      return (<Recipe>{ recipes[i] }</Recipe>)
    })} */}
  {/* <Name>쏘맥 황금비율</Name>
  <Rate>소주</Rate>
  <Rate>:</Rate>
  <Rate>맥주</Rate>
  <Rate> = </Rate>
  <Rate>3</Rate>
  <Rate>:</Rate>
  <Rate>7</Rate> */}
  </>
)
}
const Body = styled.div`
display : flex;
flex-wrap: wrap;
`
const Name = styled.div`
display : flex,
flex-wrap: wrap,
display: flex;
justify-content: center;
align-items: center ;
margin: 2vh;
padding: 1em;
font-weight : bold;
`
const Rate = styled.div`
`

export default Recipe