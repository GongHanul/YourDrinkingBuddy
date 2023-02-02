import styled from "styled-components";
import { React, useState } from 'react';
import { useSelector } from "react-redux"

function Recipe() {  
  const recipes = useSelector((state)=> state.recipe)
  const beverageMap = useSelector((state)=> state.beverageMap)
  
  console.log(recipes)
  return(
  <>
  <Body>
  { recipes.map(function(recipe, i){
    return (<Name>{ recipes[i].recipe_name }
    {recipe.ingredients.map(function(ingredient,j){
      return(<><br /><br />
      <>{beverageMap[ingredient.beverage_id].beverage_name}</>
        <>{ingredient.recipe_ingredient_ratio}</></>
          )
        }
      )
    }
    </Name>
        )
      }
    )
  }
  </Body>
  </>
)
}
const Body = styled.div`
  display : flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center ;
`
const Cardlst = styled.div`
  display : flex,
  `
const Name = styled.div`
  display : flex,
  justify-content: center;
  align-items: center ;
  background: #81D8CF;
  color : #ffffff;
  border-radius : 1vh;
  font-weight : bold;
  width : 200px;
  margin: 2vh;
  padding: 1em;
`
// color : #89cff0;
const BName = styled.div`
`
const Rate = styled.div`
`

export default Recipe