import styled from "styled-components";
import { React } from 'react';
import { useSelector } from "react-redux"

function Recipe() {  
  const recipes = useSelector((state)=> state.recipe)
  const beverageMap = useSelector((state)=> state.beverageMap)
  
  return(
    <>
  <Body>
  { recipes.map(function(recipe, i){
    const size = recipe.ingredients.length
    return (
      <ListCard>
      <RecipeName>{ recipe.recipe_name }🍸</RecipeName>
      <BeverageName>
        { recipe.ingredients.map(function(ingredient, j){
          if(j < size-1){
          return (<>{beverageMap[ingredient.beverage_id].beverage_name} : </>)
        }
        else{
          return (<>{beverageMap[ingredient.beverage_id].beverage_name}</>)
        }
      }
      )
    }
      </BeverageName>
      <BeverageRatio>
      { recipe.ingredients.map(function(ingredient, j){
        if(j < size-1){
          return (<>{ingredient.recipe_ingredient_ratio} : </>)
        }
        else{
          return (<>{ingredient.recipe_ingredient_ratio}</>)
        }
      }
      )
    }
      </BeverageRatio>
      </ListCard>
        )  
      }
      )
  }
  </Body>
  </>
  )
}

const ListCard = styled.div`
margin : 3vh 2vh 1vh;
display : flex;
align-items: center ;
flex-direction: column;
position: relative;
font-weight : bold;
min-width : 33vw;
padding: 1vh;
background: #B9D1E4;
color : #474747;
box-sizing: border-box;
border-radius : 10px;
border: 1px solid #ddd;
background-size: cover;
background-clip: content-box;
&:after{
  content: "";
  display: block;
  position: absolute;
  border: 40px solid transparent;
  border-bottom: 40px solid #fefefe;
  bottom: -50px;
  right: -45px;
  box-shadow: 0px 7px 6px -9px black;
  transform: rotate(135deg);
}
&:before{
  content: "";
  display: block;
  position: absolute;
  border: 40px solid transparent;
  border-top: 40px solid #fefefe;
  top: -50px;
  left: -45px;
  box-shadow: 0px -7px 6px -9px black;
  transform: rotate(135deg);
}
`
const Body = styled.div`
  display : flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center ;
  height: 100vh;
  overflow-y : auto;
`
// font-family: 'Black Han Sans', sans-serif;
const RecipeName = styled.div`
  z-index: 1;
  font-size : 4.5vh;
  margin : 10px 0;
  color : #0a2133;
  font-family: 'Jua', sans-serif;
  font-weight: bold;
  letter-spacing: 0.6vh;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
const BeverageName = styled.div`
  font-size : 3.5vh;
  color : #004680;
  font-family: 'Jua', sans-serif;
  font-weight: bold;
  letter-spacing: 0.3vh;
`
const BeverageRatio = styled.div`
  font-size : 4vh;
  margin : 0 0 10px 0 ;
  color : #004680;
  font-family: 'Jua', sans-serif;
  font-weight: bold;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
// color : #89cff0;

export default Recipe