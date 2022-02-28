import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    users:[],
    currentUser:null,
    adminAuth:'admin123456',
    isAdmin:false,
    userOrders:[]
} 

const user = {
    createUser(state,action){
        // debugger
        state.currentUser = action.payload
    },
    getUser(state,action){
    state.users.push(action.payload)
    },
    login(state,action){
        state.currentUser = action.payload
        if(state.currentUser.password == state.adminAuth)
        state.isAdmin = true
    },
    getOrderByCustomerId(state,action){
      state.userOrders = action.payload
    //   alert(JSON.stringify(state.userOrders))
    },createRentToUser(state,action){
        if(action.payload)
        state.userOrders.push(action.payload)
    },getAllUsers(state,action){
        state.users = action.payload
    }
    ,initialState
}


export default produce((state,action)=>{
    execHandler(state,action,user)
},initialState)

