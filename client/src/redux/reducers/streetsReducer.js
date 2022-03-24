import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    streets:null
}

const streets = {
    getAllStreets(state, action) {
        console.log("payload", action.payload)
       state.streets = action.payload
    }
    , initialState
}


export default produce((state, action) => {
    execHandler(state, action, streets)
}, initialState)

