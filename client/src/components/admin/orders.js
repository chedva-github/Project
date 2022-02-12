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
    }, [])

    if (!data?.user?.isAdmin)
        navigate('/')

    return (
        <div>
            <h1>orders</h1>
            {data?.order?.orders?.map((item, key) => {
                <div key={key}>
                    {item.paymentNum}
                    {item.endDate}
                    {item.startDate}
                </div>
            })}
        </div>)
}