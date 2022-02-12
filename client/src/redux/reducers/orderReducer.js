import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    orders:[]
} 

const order = {
    getAllOrders(state,action){
        debugger
        state.orders = action.payload
    }
    ,initialState
}


export default produce((state,action)=>{
    execHandler(state,action,order)
},initialState)
