import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    streets:null
}

const streets = {
    getAllStreets(state, action) {
        console.log("payload", action.payload)
        // debugger
        state.streets = action.payload
        // alert(JSON.stringify(state.currentUser))
    }
    , initialState
}


export default produce((state, action) => {
    execHandler(state, action, streets)
}, initialState)

