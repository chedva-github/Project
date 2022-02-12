import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    advertisingPoint: [],
    street:null,
    size:null
}

const AdvertisingPoint = {
    getAllAdvertisingPoint(state, action) {
        debugger
        state.advertisingPoint = action.payload
        // alert(JSON.stringify(state.currentUser))
    },setValue(state, action) {
        debugger
        state.street = action.payload.street
        state.size = action.payload.size
    }
    , initialState
}


export default produce((state, action) => {
    execHandler(state, action, AdvertisingPoint)
}, initialState)

