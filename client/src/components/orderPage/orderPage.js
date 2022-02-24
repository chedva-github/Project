//props?.location?.state?.street
import React ,{useEffect} from "react";
import {useLocation,useNavigate} from 'react-router-dom'
export default function OrderDetails(props){
    const navigate = useNavigate()
    const {state} = useLocation()
    const {date,size,street} = state
    useEffect(() => {
    
       console.log(state)
    }, []);

    return(
        <>
        <h1>רחוב: {street}</h1>
        <h1>גודל: {size}</h1>
        <h1>תאריך: {date}</h1>
        <button onClick={()=>navigate("/Payment",{state:{street:street,size:size,date:date}})}>לתשלום</button>
        </>
    )
}