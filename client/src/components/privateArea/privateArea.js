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
      {/* <h1>:אזור אישי</h1> */}
      <h1> שלטי חוצות בפתח תקווה</h1>
      {/* <Container> */}
       {data?.user?.currentUser?.name} שלום
<br />
      <AddIcon
        id="addResponsible"
        style={{ cursor: 'pointer' }}
        fontSize='small'
        onClick={addBillboards}
      /> הוספת שלט 
      {show ? <AddBillBoard prop='new' /> : null}
      <BillBoardTable />

     
    </>
  )
}