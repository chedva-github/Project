import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
  advertisingPoint: [],
  street: null,
  size: null,
  currentAdvertstingPoint:{}
}

const AdvertisingPoint = {
  getAllAdvertisingPoint (state, action) {
    // debugger
    console.log('advertisingPointReducer getAllAdvertisingPoint',action.payload)

    state.advertisingPoint = action.payload
    // alert(JSON.stringify(state.currentUser))
  },
  setValue (state, action) {
    // debugger
    state.street = action.payload.street
    state.size = action.payload.size
  },
  editBillboard (state, action) {
    console.log('advertisingPointReducer')
    state.advertisingPoint = action.payload
  },
addBillboard (state, action) {
    state.advertisingPoint.push(action.payload)

},
deleteOneAdvertisingPoint (state, action){
    state.advertisingPoint = action.payload
},
setCurrentAdvertstingPoint(state, action){
  state.currentAdvertstingPoint = action.payload
},
  initialState
}

export default produce((state, action) => {
  execHandler(state, action, AdvertisingPoint)
}, initialState)
