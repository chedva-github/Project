import React ,{useEffect} from 'react'
import {useDispatch ,useSelector}from 'react-redux'
import actions from '../../redux/action'
import {Container,Row,Col} from 'react-bootstrap'
export default function PrivateArea(){

    const data = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
                debugger
    dispatch(actions.getOrderByCustomerId(data?.user?.currentUser?._id))
    dispatch(actions.getAllAdvertisingPoint())
    dispatch(actions.getAllStreets())
    dispatch(actions.getAllSize())
    },[]);

    return(
        <>
        <h1>privateArea</h1>
        hello {data?.user?.currentUser?.name}
        <table style={{direction:'rtl'}}>
               <tr>
                   <th>רחוב</th>
                   <th>תאריך התחלה</th>
                   <th>תאריך סיום</th>
                   <th>גודל</th>
                   <th>מחיר</th>
               </tr>
        {data?.user?.userOrders?.map((item,index)=>(
            <tr key={index} style={{border:'solid black 1px',width:'40%'}}>
                <td>{data?.streets?.streets?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).address)?.streetName }</td>
                <td>{item.startDate.split('T')[0]}</td>
                <td>{item.endDate.split('T')[0]}</td>
                <td>{data?.size?.size?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).size)?.sizeName }</td>
                <td>{item.paymentNum}</td>
            </tr>

        ))}
        </table>
        </>
    )
}