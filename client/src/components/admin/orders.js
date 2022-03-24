import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'

import { Modal, Table, Form, Container, Button } from 'react-bootstrap'

import actions from '../../redux/action'

export default function Orders () {
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
    if (ordersdata[index].startDate > now) alert('לא ניתן לבטל הזמנה פעילה')
    else dispatch(actions.cencelOrder(ordersdata[index]._id))
  }
  return (
    <div className='admin-order'>
      <h1>ההזמנות שלי</h1>

      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>ביטול הזמנה</th>

            <th>מחיר</th>
            <th>סטטוס</th>
            <th>תאריך סיום</th>
            <th>תאריך התחלה </th>
            <th>סוג </th>
            {/* <th>רחוב</th> */}
            <th>תמונה</th>
          </tr>
        </thead>
        <tbody>
          {ordersdata &&
            ordersdata.length > 0 &&
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
                    <td>
                      {order.AdvertisingPointId &&
                        order.AdvertisingPointId.price}
                    </td>
                    <td>{order.AdvertisingPointId?.status?.toString()}</td>
                    <td>{order.endDate.split('T')[0]}</td>
                    <td>{order.startDate.split('T')[0]}</td>
                    <td>
                      {order.AdvertisingPointId &&
                        order.AdvertisingPointId.size.sizeName}
                    </td>
                    {/* <td>{order.AdvertisingPointId && order.AdvertisingPointId.address.streetName}</td> */}
                    <td>
                      <img src={order.img} />
                    </td>
                  </tr>
                </>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}
