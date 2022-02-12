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
        {data?.user?.userOrders?.map((item,index)=>(
            <div key={index} style={{border:'solid black 1px',width:'40%'}}>
                <h5>רחוב: {data?.streets?.streets?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).address)?.streetName }</h5>
                <h5>תאריך התחלה: {item.startDate.split('T')[0]}</h5>
                <h5>תאריך סיום: {item.endDate.split('T')[0]}</h5>
                <h5>גודל: {data?.size?.size?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).size)?.sizeName }</h5>
            </div>

        ))}
        </>
    )
}