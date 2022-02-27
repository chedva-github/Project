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
        // alert(JSON.stringify(state.currentUser))
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
    }
    ,initialState
}


export default produce((state,action)=>{
    execHandler(state,action,user)
},initialState)

