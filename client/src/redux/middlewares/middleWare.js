import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const middle = ({ dispatch, getState }) => next => async action => {
  // export const getUserDetails = ({ dispatch, getState }) => next => action => {

  if (action.type == 'CREATE_USER') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(action.payload)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:4000/createUser', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.newUser
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'LOGIN') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw1 = JSON.stringify(action.payload)

    var requestOptions1 = {
      method: 'POST',
      headers: myHeaders,
      body: raw1,
      redirect: 'follow'
    }
    fetch('http://localhost:4000/getUserByNameAndPassword', requestOptions1)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.user
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'GET_ALL_STREETS') {
    try {
      const res = await axios.get('http://localhost:4000/getAllStreets')
      console.log('res', res.data)
      action.payload = res.data
      return next(action)
    } catch (e) {
      console.log('err', e.message)
    }
  } else if (action.type == 'GET_ALL_SIZE') {
    try {
      console.log('i am  here')
      const res = await axios.get('http://localhost:4000/getAllSize')
      console.log('res', res.data)
      action.payload = res.data
      return next(action)
    } catch (e) {
      console.log('err', e.message)
    }
  } else if (action.type == 'GET_ALL_ADVERTISING_POINT') {
    try {
      console.log('i am  here')
      const res = await axios.get(
        'http://localhost:4000/getAllAdvertisingPoint'
      )
      console.log('res', res.data)
      action.payload = res.data
      return next(action)
    } catch (e) {
      console.log('err', e.message)
    }
  } else if (action.type == 'GET_ORDER_BY_CUSTOMER_ID') {
    fetch('http://localhost:4000/getRentToUserByUserId/' + action.payload)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'ADD_BILLBOARD') {
    //הוספת שלט עי המנהל
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(action.payload)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    fetch('http://localhost:4000/createAdvertisingPoint', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.newAdvertisingPoint
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'EDIT_BILLBOARD') {
    //עריכת  שלט עי המנהל
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(action.payload)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    fetch('http://localhost:4000/updateAdvertisingPoint', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'DELETE_ONE_ADVERTISING_POINT') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch(
      `http://localhost:4000/deleteAdvertisingPoint/${action.payload}`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch({ type: 'SET_ADVERTISING_AFTER_CENCEL', payload: result })
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'ADD_ORDER') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var raw = JSON.stringify(action.payload)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    fetch(`http://localhost:4000/createOrder`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'CREATE_RENT_TO_USER') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var raw = JSON.stringify(action.payload)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:4000/createrentToUser', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.newRentToUser
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'GET_ALL_USERS') {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('http://localhost:4000/getAllUsers', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'GET_ALL_ORDERS') {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(
      `http://localhost:4000/getOrdersforUser/${
        getState().user.currentUser._id
      }`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'CENCEL_ORDER') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch(
      `http://localhost:4000/deleteOrder/${action.payload}/${
        getState().user.currentUser._id
      }`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch({ type: 'SET_ORDERS_AFTER_CENCEL', payload: result })
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'UPDATE_USER') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(action.payload)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch(
      `http://localhost:4000/updateUser/${getState().user.currentUser._id}`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.user
        dispatch({ type: 'SET_LOADER' })

        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'GET_ORDERS_AWAIT_TO_ACCEPT') {
    fetch(`http://localhost:4000/getOrdersAwaitToAccept`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result
        return next(action)
      })
      .catch(error => console.log('error', error))
  } else if (action.type == 'CHANGE_ACCEPT') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    console.log(action.payload)
    var raw = JSON.stringify(action.payload)
    console.log(raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: raw
    }
    fetch(`http://localhost:4000/changeAccept`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch({ type: 'SET_ORDERS_AFTER_ECCEPT', payload: result._id })
      })
      .catch(error => console.log('error', error))
    return next(action)
  } else if (action.type == 'CHECK_AP_AVILABLE') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    console.log(action.payload)
    let obj = {
      advertisingPointId: getState().AdvertisingPoint.currentAdvertstingPoint
        ._id,
      startDate: getState().order.startDate,
      endDate: getState().order.endDate
    }
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(obj),
      redirect: 'follow'
    }
    fetch(`http://localhost:4000/checkAvilable`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch({ type: 'SET_STATUS', payload: result.status })

        return next(action)
      })
      .catch(error => console.log('error', error))
    return next(action)
  } else if (action.type == 'GET_POPULARITY_BB') {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    console.log(action.payload)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch(`http://localhost:4000/getPopularyBillBoard`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch({ type: 'SET_POPULAR', payload: result })

        return next(action)
      })
      .catch(error => console.log('error', error))
    return next(action)
  }

  return next(action)
}
