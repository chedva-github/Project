import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/action'
import AddIcon from '@material-ui/icons/Add'




import AddBillBoard from '../admin/addBillBoard'
import BillBoardTable from '../admin/billBoardTable'

export default function PrivateArea() {
  const [show, setShow] = useState(false)
  const data = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    // debugger
    dispatch(actions.getOrderByCustomerId(data?.user?.currentUser?._id))
    dispatch(actions.getAllAdvertisingPoint())
    dispatch(actions.getAllStreets())
    dispatch(actions.getAllSize())
    console.log(data)
    setShow(false)

  }, []);

  const addBillboards = () => {
    setShow(!show)
  }
  return (
    <>
      <h1>:אזור אישי</h1>
      שלום {data?.user?.currentUser?.name}


      {/* {data?.user?.isAdmin?  */}
      <BillBoardTable />
      <AddIcon
        id="addResponsible"
        style={{ cursor: 'pointer' }}
        fontSize='small'
        onClick={addBillboards}
      />
      {/* : null} */}
      {show ? <AddBillBoard prop='new' /> : null}

      {/* <table>
        {data?.user?.userOrders?.map((item,index)=>(
            <tr key={index} style={{border:'solid black 1px',width:'40%'}}>
                <td>{data?.streets?.streets?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).address)?.streetName }</td>
                <td>{item.startDate.split('T')[0]}</td>
                <td>{item.endDate.split('T')[0]}</td>
                <td>{data?.size?.size?.find(s=>s._id==data?.AdvertisingPoint?.advertisingPoint?.find(x=>x._id==item.pointId).size)?.sizeName }</td>
                <td>{item.paymentNum}</td>
            </tr>

        ))}
        </table> */}
    </>
  )
}