import React, { useState, useRef, useEffect } from 'react'
import { Modal, Table, Form, Container, Button } from 'react-bootstrap'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/action'
import AddBillBoard from './addBillBoard'


export default function BillBoardTable (props) {
  const data = useSelector(state => state)
  const dispatch = useDispatch()
  const [billboarddata, setBillboarddata] = useState([])
  const [showPost, setShowPost] = useState(0)
  const [editShow, setEditshow] = useState(-1)
  const dataRef = useRef(null)

  useEffect( () => {
    dispatch(actions.getAllAdvertisingPoint())
        // setBillboarddata(data?.AdvertisingPoint?.advertisingPoint)
  }, [])

  useEffect( () => {
    console.log(billboarddata);
    setBillboarddata(data.AdvertisingPoint.advertisingPoint)
   }, [data.AdvertisingPoint?.advertisingPoint])


  const handleEdit = index => {
    setEditshow(index)
  }
  const handleDelete = async index => {
   await dispatch(actions.deleteOneAdvertisingPoint(billboarddata[index]._id))
  }
  return (
    <>
      {/* <h2> שלטי חוצות בפתח תקווה</h2> */}

       <Container>
 
        <br />
        <Table striped bordered hover className='mt-5'>
          <thead>
            <tr>
              <th>עריכה</th>
              <th>מחיר</th>
              <th>סטטוס שלט</th>
              <th>סוג </th>
              <th>רחוב</th>
            </tr>
          </thead>
          <tbody>
            {billboarddata.length > 0 && 
              billboarddata.map((billBoard, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <div>
                          <AiFillDelete
                            onClick={e => {
                              handleDelete(index)
                            }}
                          />
                          <AiFillEdit
                            onClick={e => {
                              handleEdit(index)
                            }}
                          />

                          {editShow == index && (
                            <AddBillBoard prop='edit' index={index} />
                          )}
                        </div>
                      </td>
                      <td>{billBoard.price}</td>
                      <td>{billBoard.status?.toString()}</td>
                      <td>{billBoard.size?.sizeName}</td>
                      <td>{billBoard.address?.streetName}</td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </Table>
      </Container> 
    </>
  )
}
