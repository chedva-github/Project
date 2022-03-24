import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import action from '../../redux/action'

export default function OrderPage () {
  const [createOrderObj, setCreateOrderObj] = useState()
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const navigate = useNavigate()
  useEffect(() => {
    setCreateOrderObj({
      userId: data.user.currentUser?._id,
      AdvertisingPointId: data.AdvertisingPoint.currentAdvertstingPoint._id,
      startDate: data.order.startDate,
      endDate: data.order.endDate,
      img: data.order.orderImg
    })
  }, [])

  const message = ` ליום ${data.order.orderPrice} המחיר הינו . ${
    data.order.endDate?.toISOString().split('T')[0]
  } -  ל ${data.order.startDate?.toISOString().split('T')[0]}  בין התאריכים:,${
    data.order.orderStreet?.streetName
  } שלום, ביקשת להזמין את השלט ברחוב`

  confirmAlert({
    title: 'אישור הזמנה',
    message: message,
    buttons: [
      {
        label: 'מאשר',
        onClick: () => navigate('/Payment')
      },
      {
        label: 'לא מאשר',
        onClick: () => navigate('/Locations')
      }
    ]
  })

  return (
    <div>
      <confirmAlert />
    </div>
  )
}
