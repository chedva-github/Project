import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    orders:null,
    startDate: null,
    endDate:null,
    orderStreet:null,
    orderSize:null,
    orderPrice:null,
    available:null,
} 

const order = {
   
    setDate(state, action){
        state.startDate = action.payload[0]
        state.endDate = action.payload[1]

    },
    setStreet(state, action){
state.orderStreet= action.payload
    },
    setSize(state, action){
        state.orderSize= action.payload

    },
    setPrice(state, action){
        state.orderPrice= action.payload
    },
    setStatus(state, action){
state.available= action.payload
    },
     getAllOrders(state,action){
        // debugger
        state.orders = action.payload
    },
    
    setOrdersAfterCencel(state, action){
    state.orders=action.payload
    }
  
    ,initialState
}


export default produce((state,action)=>{
    execHandler(state,action,order)
},initialState)
