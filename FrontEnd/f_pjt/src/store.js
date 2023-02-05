import { configureStore, createSlice } from '@reduxjs/toolkit'


let ratio = createSlice({
  name : 'ratio',
  initialState : [
    {rate: 0, id: 1, beverage_id: -1},{rate: 0, id: 2, beverage_id: -2},{rate: 0, id: 3, beverage_id: -3 },{rate: 0, id:4, beverage_id: -4}],
  reducers : {
    increaseRatio(state, action){
      state[action.payload].rate++
    },
    decreaseRatio(state, action){
      state[action.payload].rate--
    },
    changeBeverage(state, action){
      state[action.payload.idx].beverage_id =  action.payload.beverage_id
    }
  }
})

export let { increaseRatio, decreaseRatio, changeBeverage } = ratio.actions


let port = createSlice({
  name : 'port',
  initialState : [{beverage_id : '-1', beverage_image_url : 'img/bottle_pick.png'},{beverage_id : '-1', beverage_image_url : 'img/bottle.png'},{beverage_id : '-1', beverage_image_url : 'img/bottle_pick.png'},{beverage_id : '-1', beverage_image_url : 'img/bottle.png'}],
  reducers : {
    changePort(state, action){
      state[action.payload.idx] = { beverage_id : action.payload.beverage_id, beverage_image_url : action.payload.beverage_image_url}
    }
  }
})

export let { changePort } = port.actions



let beverage = createSlice({
  name : 'beverage',
  initialState : [{brverage_name : '최성빈'},
    ],
  reducers : {
    inputBeverage(state, action){
             action.payload.push({beverage_id: -1, beverage_name: '없음', beverage_image_url: 'img/bottle.png'})
      return state = action.payload
    }

  }
}) 

export let { inputBeverage } = beverage.actions

let beverageMap = createSlice({
  name : 'beverageMap',
  initialState : {},
  reducers : {
    setBeverages(state, action){
      state = {}
      action.payload.forEach( (beverage) => {
        state[beverage.beverage_id] = beverage;
      });
      return state;
    },
    insertBeverageByID(state, action){
      return state[action.payload] = beverage;
    },
    deleteBeverageByID(state, action){
      delete state[action.payload]
    }
  }
}) 

export let { setBeverages, insertBeverageByID, deleteBeverageByID } = beverageMap.actions


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
    beverageMap : beverageMap.reducer,
    recipe : recipe.reducer,
    port : port.reducer
   }
}) 