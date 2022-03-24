import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    size:[]
} 

const size = {
    getAllSize(state,action){
        console.log("payload", action.payload)
        state.size = action.payload
    }
    ,initialState
}


export default produce((state,action)=>{
    execHandler(state,action,size)
},initialState)
