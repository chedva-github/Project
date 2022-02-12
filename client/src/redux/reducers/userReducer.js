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
        debugger
        state.currentUser = action.payload
        // alert(JSON.stringify(state.currentUser))
    },
    getUser(state,action){
    state.users.push(action.payload)
    },
    login(state,action){
        debugger
        state.currentUser = action.payload
        if(state.currentUser.password == state.adminAuth)
        state.isAdmin = true
    //    alert(JSON.stringify(state.currentUser))
    },getOrderByCustomerId(state,action){
      state.userOrders = action.payload
    //   alert(JSON.stringify(state.userOrders))
    }
    ,initialState
}


export default produce((state,action)=>{
    execHandler(state,action,user)
},initialState)

