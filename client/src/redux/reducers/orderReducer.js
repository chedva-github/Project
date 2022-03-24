import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
  orders: null,
  startDate: null,
  endDate: null,
  orderStreet: null,
  orderSize: null,
  orderPrice: null,
  available: null,
  orderImg: null,
  awaitToAccept: null,
}

const order = {
  setDate (state, action) {
    state.startDate = action.payload[0]
    state.endDate = action.payload[1]
  },
  setStreet (state, action) {
    state.orderStreet = action.payload
  },
  setSize (state, action) {
    state.orderSize = action.payload
  },
  setPrice (state, action) {
    state.orderPrice = action.payload
  },
  setStatus (state, action) {
    state.available = action.payload
  },
  getAllOrders (state, action) {
    state.orders = action.payload
  },
  setVailableToNull(state, action){
    state.available = null

  },
  setOrdersAfterCencel (state, action) {
    state.orders = action.payload
    
  },
  setImg (state, action) {
    state.orderImg = action.payload
  },
  getOrdersAwaitToAccept (state, action) {
    state.awaitToAccept = action.payload
  },
setOrdersAfterEccept (state, action) {

  state.awaitToAccept = state.awaitToAccept.filter(a=>a._id!=action.payload)
  console.log("afterrFilter",state.awaitToAccept);
},
  initialState
}

export default produce((state, action) => {
  execHandler(state, action, order)
}, initialState)
