import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actions from "../../redux/action";

export default function Orders() {
    const navigate = useNavigate()
    const data = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        // alert('orderssssss')
        dispatch(actions.getAllOrders())
        dispatch(actions.getAllAdvertisingPoint())
       dispatch(actions.getAllStreets())
       dispatch(actions.getAllSize())
       dispatch(actions.getAllUsers())
    }, [])

    if (!data?.user?.isAdmin)
        navigate('/')

    return (
        <div>
            <h1>orders</h1>
            <table style={{direction:'rtl'}}>
               <tr>
                   <th>שם משתמש</th>
                   <th>רחוב</th>
                   <th>תאריך התחלה</th>
                   <th>תאריך סיום</th>
                   <th>גודל</th>
                   <th>מחיר</th>
               </tr>
        {data?.order?.orders?.map((item,index)=>(
            <tr key={index} style={{border:'solid black 1px',width:'40%'}}>
                <td>{data?.user?.users?.find(x=>x._id==item.userId)?.name}</td>
                <td>{data?.streets?.streets?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).address)?.streetName }</td>
                <td>{item.startDate.split('T')[0]}</td>
                <td>{item.endDate.split('T')[0]}</td>
                <td>{data?.size?.size?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).size)?.sizeName }</td>
                <td>{item.paymentNum}</td>
            </tr>

        ))}
        </table>
            {/* {data?.order?.orders?.map((item, key) => (
                <div key={key}>
                <h5>רחוב: {data?.streets?.streets?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).address)?.streetName }</h5>
                <h5>תאריך התחלה: {item.startDate.split('T')[0]}</h5>
                <h5>תאריך סיום: {item.endDate.split('T')[0]}</h5>
                <h5>משתמש: {data?.user?.users?.find(x=>x._id==item.userId)?.name}</h5>
                    {item.paymentNum}
                </div>
               ))} */}
        </div>)
}