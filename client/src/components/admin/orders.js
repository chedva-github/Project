import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'

import { Modal, Table, Form, Container, Button } from 'react-bootstrap'

import actions from '../../redux/action'

export default function Orders() {
  // const navigate = useNavigate()
  const data = useSelector(state => state)
  const dispatch = useDispatch()
  const [ordersdata, setOrdersdata] = useState([])

  useEffect(() => {
    if (data.user.currentUser?._id) dispatch(actions.getAllOrders())
  }, [data.user.currentUser?._id])
  useEffect(() => {
    setOrdersdata(data.order.orders)
  }, [data.order.orders])
  const handleCancle = index => {
    const now = new Date()
    if (ordersdata[index].startDate > now)
      alert("לא ניתן לבטל הזמנה פעילה")
    else
      dispatch(actions.cencelOrder(ordersdata[index]._id))
    // setEditshow(index)
  }
  return (
    <div className='admin-order'>
      <h1>ההזמנות שלי</h1>

      {/* <Container> */}
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>ביטול הזמנה</th>

            <th>מחיר</th>
            <th>סטטוס</th>
            <th>תאריך סיום</th>
            <th>תאריך התחלה </th>
            <th>סוג </th>
            <th>רחוב</th>
            <th>תמונה</th>
          </tr>
        </thead>
        <tbody>
          {ordersdata && ordersdata.length > 0 &&
            ordersdata.map((order, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>
                      <div>
                        <AiFillDelete
                          onClick={e => {
                            handleCancle(index)
                          }}
                        />
                      </div>
                    </td>

                    <td>{order.AdvertisingPointId && order.AdvertisingPointId.address.streetName}</td>
                    <td>{order.AdvertisingPointId?.status?.toString()}</td>
                    <td>{order.AdvertisingPointId && order.AdvertisingPointId.size.sizeName}</td>
                    <td>{order.startDate.split('T')[0]}</td>
                    <td>{order.endDate.split('T')[0]}</td>
                    <td><img src={order.img} /></td>

                  </tr>
                </>
              )
            })}
        </tbody>
      </Table>
      {/* </Container> */}

      {/* <table style={{ direction: 'rtl' }}>
        <tr>
          <th>שם משתמש</th>
          <th>רחוב</th>
          <th>תאריך התחלה</th>
          <th>תאריך סיום</th>
          <th>גודל</th>
          <th>מחיר</th>
        </tr>
        {data?.order?.orders?.map((item, index) => (
          <tr key={index} style={{ border: 'solid black 1px', width: '40%' }}>
            <td>{data?.user?.users?.find(x => x._id == item.userId)?.name}</td>
            <td>
              {
                data?.streets?.streets?.find(
                  s =>
                    s._id ==
                    data?.AdvertisingPoint?.advertisingPoint?.find(
                      x => x._id == item.pointId
                    ).address
                )?.streetName
              }
            </td>
            <td>{item.startDate.split('T')[0]}</td>
            <td>{item.endDate.split('T')[0]}</td>
            <td>
              {
                data?.size?.size?.find(
                  s =>
                    s._id ==
                    data?.AdvertisingPoint?.advertisingPoint?.find(
                      x => x._id == item.pointId
                    ).size
                )?.sizeName
              }
            </td>
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
    </div>
  )
}
