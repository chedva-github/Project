import axios from "axios"

export const middle = store => next => async (action) => {

  if (action.type == "CREATE_USER") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(action.payload);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    debugger
    fetch("http://localhost:4000/createUser", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.newUser
        return next(action)
      })
      .catch(error => console.log('error', error));
  }
 else if (action.type == "LOGIN") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw1 = JSON.stringify(action.payload);

    var requestOptions1 = {
      method: 'POST',
      headers: myHeaders,
      body: raw1,
      redirect: 'follow'
    }
    debugger
    fetch("http://localhost:4000/getUserByNameAndPassword", requestOptions1)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.user
        return next(action)
      })
      .catch(error => console.log('error', error));
  }

  else if (action.type == "GET_ALL_STREETS") {
    try {
      debugger;
      console.log("i am  here")
      const res = await axios.get('http://localhost:4000/getAllStreets')
      console.log("res", res.data)
      action.payload = res.data
      return next(action);
    }
    catch (e) {
      console.log("err", e.message)
    }
  }
  else if (action.type == "GET_ALL_SIZE") {
    try {
      debugger;
      console.log("i am  here")
      const res = await axios.get('http://localhost:4000/getAllSize')
      console.log("res", res.data)
      action.payload = res.data
      return next(action);
    }
    catch (e) {
      console.log("err", e.message)
    }
  }
 else if (action.type == "GET_ALL_ADVERTISING_POINT") {
    try {
      debugger;
      console.log("i am  here")
      const res = await axios.get('http://localhost:4000/getAllAdvertisingPoint')
      console.log("res", res.data)
      action.payload = res.data
      return next(action);
    }
    catch (e) {
      console.log("err", e.message)
    }
  }
  else
   if(action.type == 'GET_ALL_ORDERS'){
    axios.get('http://localhost:4000/getAllRentToUser')
    .then(res=>res.data)
    .then(r=>{
      action.payload = r
      return next(action)
    })
    
  }
 else if(action.type == 'GET_ORDER_BY_CUSTOMER_ID'){
    debugger
    fetch("http://localhost:4000/getRentToUserByUserId/"+action.payload)
      .then(response => response.json())
      .then(result => {console.log(result)
      action.payload = result
      return next(action)
      })
      .catch(error => console.log('error', error));
  }
else
return next(action)
}