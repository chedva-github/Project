import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
  users: [],
  currentUser: null,
  adminAuth: 'admin123456',
  isAdmin: false,
  userOrders: []
}

const user = {
  createUser (state, action) {
    state.currentUser = action.payload
  },
  getUser (state, action) {
    state.users.push(action.payload)
  },
  login (state, action) {
    state.currentUser = action.payload
    if (state.currentUser.password == state.adminAuth) state.isAdmin = true
  },
  getOrderByCustomerId (state, action) {
    state.userOrders = action.payload
  },
  createRentToUser (state, action) {
    if (action.payload) state.userOrders.push(action.payload)
  },
  getAllUsers (state, action) {
    state.users = action.payload
  },
  logOut (state, action) {
    state.currentUser = null
  },
  updateUser (state, action) {
    state.currentUser = action.payload
  },
  setLoader (state, action) {
    state.loader = false
    state.currentUser = action.payload
  },
  initialState
}

export default produce((state, action) => {
  execHandler(state, action, user)
}, initialState)
