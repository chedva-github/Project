
import React ,{useEffect,useState} from 'react'
import {useDispatch ,useSelector}from 'react-redux'
import actions from '../../redux/action'




export default function AcceptAdmin(){
  const [show, setShow] = useState(false)
    const data = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(actions.getOrdersAwaitToAccept())
    },[]);
//     useEffect(() => {
// console.log(data);
//         },[data.order.awaitToAccept]);
function accept(val){
    alert('fe')
    dispatch(actions.changeAccept({"accept":"1","orderId":val}))
}
function notAccept(e){
    console.log(e)
    alert(e)
    dispatch(actions.changeAccept({"accept":"0","orderId":e}))
}
    return(
        <>
        <h1>הזמנות אלו מחכות לאישור</h1>

    {data.order.awaitToAccept&&data.order.awaitToAccept.map((value,index)=>{
       return(<><h2>{value.accept}</h2><p>{value.startDate}</p>
       <button onClick={accept}>מאשר</button>
       <button onClick={e=>notAccept(e.target.value)} >לא מאשר</button>
       </>  )
    })}
        </>
    )
}