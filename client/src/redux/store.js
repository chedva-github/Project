import { createStore, combineReducers, applyMiddleware } from 'redux'
import user from './reducers/userReducer'
import { middle } from './middlewares/middleWare'
import streets from './reducers/streetsReducer'
import AdvertisingPoint from './reducers/advertisingPointReducer'
import size from './reducers/sizeReducer'
import order from './reducers/orderReducer'

const reducer = combineReducers({ user, streets, AdvertisingPoint, size,order })
const store = createStore(reducer, (applyMiddleware(middle)))


window.store = store
export default store