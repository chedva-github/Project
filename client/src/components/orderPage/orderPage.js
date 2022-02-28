import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import action from '../../redux/action'

export default function OrderPage() {
  const [createOrderObj, setCreateOrderObj] = React.useState();
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const navigate = useNavigate()
 useEffect(() => {
setCreateOrderObj(
  {userId:data.user.currentUser._id,
    AdvertisingPointId: data.AdvertisingPoint.currentAdvertstingPoint._id,
    startDate: data.order.startDate,
    endDate: data.order.endDate
})
 },[])
const message = ` ליום ${data.order.orderPrice} המחיר הינו . ${data.order.endDate?.toISOString().split('T')[0]} -  ל ${data.order.startDate?.toISOString().split('T')[0]}  בין התאריכים:,${data.order.orderStreet?.streetName} שלום, ביקשת להזמין את השלט ברחוב` 
      
 confirmAlert({
      title: 'אישור הזמנה',
      message:message,
      buttons: [
        {
          label: 'מאשר',
          onClick: async() => dispatch(action.addOrder(createOrderObj)
          )
        },
        {
          label: 'לא מאשר',
          onClick: () => navigate('/Locations')
        }
      ]
    })

  return (
<div><confirmAlert/></div>
  )
//props?.location?.state?.street
// import React ,{useEffect} from "react";
// import {useLocation,useNavigate} from 'react-router-dom'
// export default function OrderDetails(props){
//     const navigate = useNavigate()
//     const {state} = useLocation()
//     const {date,size,street} = state
//     useEffect(() => {
    
//        console.log(state)
//     }, []);

//     return(
//         <>
//         <h1>רחוב: {street}</h1>
//         <h1>גודל: {size}</h1>
//         <h1>תאריך: {date}</h1>
//         <button onClick={()=>navigate("/Payment",{state:{street:street,size:size,date:date}})}>לתשלום</button>
//         </>
//     )
 }