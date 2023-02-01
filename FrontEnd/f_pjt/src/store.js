import { configureStore, createSlice } from '@reduxjs/toolkit'


let ratio = createSlice({
  name : 'ratio',
  initialState : [
    {rate: 1, id: 1},{rate: 2, id: 2},{rate: 3, id: 3},{rate: 4, id:4}],
  reducers : {
    increaseRatio(state, action){
      state[action.payload].rate++
    },
    decreaseRatio(state, action){
      state[action.payload].rate--
    },
    changeBeverage(state, action){
      state[action.payload.idx].id = action.payload.beverage_id
    }
  }
})

export let { increaseRatio, decreaseRatio, changeBeverage } = ratio.actions


let beverage = createSlice({
  name : 'beverage',
  initialState : [{brverage_name : '최성빈'},
    ],
  reducers : {
    inputBeverage(state, action){
      return state = action.payload
    }

  }
}) 

export let { inputBeverage } = beverage.actions


let recipe = createSlice({
  name : 'recipe',
  initialState : [{recipe_name : 'SOJJU'},
    ],
  reducers : {
    inputRecipe(state, action){ 
      return state = action.payload
    }
  }
})

export let { inputRecipe } = recipe.actions

export default configureStore({
  reducer: {
    ratio : ratio.reducer,
    beverage : beverage.reducer,
    recipe : recipe.reducer
   }
}) 