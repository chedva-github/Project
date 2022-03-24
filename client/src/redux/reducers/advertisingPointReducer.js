import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
  advertisingPoint: [],
  street: null,
  size: null,
  currentAdvertstingPoint: {},
  popularityBB: null
}

const AdvertisingPoint = {
  getAllAdvertisingPoint (state, action) {
    console.log(
      'advertisingPointReducer getAllAdvertisingPoint',
      action.payload
    )
    state.advertisingPoint = action.payload
  },
  setValue (state, action) {
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

  setAdvertisingAfterCencel (state, action) {
    state.advertisingPoint = action.payload
  },
  setCurrentAdvertstingPoint (state, action) {
    state.currentAdvertstingPoint = action.payload
  },
  getPopularityBb (state, action) {},
  setPopular (state, action) {
    state.popularityBB = action.payload
  },
  initialState
}

export default produce((state, action) => {
  execHandler(state, action, AdvertisingPoint)
}, initialState)
