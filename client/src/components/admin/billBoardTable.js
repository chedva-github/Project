import React, { useState, useRef, useEffect } from 'react'
import { Modal, Table, Form, Container, Button } from 'react-bootstrap'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/action'
import AddBillBoard from './addBillBoard'

// import { getUsers } from '.././crud'
// import Posts from './posts'

export default function BillBoardTable (props) {
  const data = useSelector(state => state)
  const dispatch = useDispatch()
  const [billboarddata, setBillboarddata] = useState([])
  const [showPost, setShowPost] = useState(0)
  const [dataFilter, setDataFilter] = useState([])
  const [editShow, setEditshow] = useState(-1)
  const dataRef = useRef(null)

  useEffect(async () => {
    dispatch(actions.getAllAdvertisingPoint())
    setDataFilter(data?.AdvertisingPoint?.advertisingPoint)
    setBillboarddata(data?.AdvertisingPoint?.advertisingPoint)
  }, [])

  useEffect(async () => {
    setBillboarddata(data?.AdvertisingPoint?.advertisingPoint)
  }, [data.AdvertisingPoint.advertisingPoint])
  // const filter = e => {
  //   console.log("showPost",billboarddata);
  //   setBillboarddata(billboarddata =>
  //   billboarddata.filter(d => d[e.target.name].indexOf(e.target.value) !==== -1)
  //   )
  // if(e.target.name!==nameRef.current.name)
  // nameRef.current.value = "";
  // else
  // if(e.target.name!==emailRef.current.name)
  // emailRef.current.value = "";

  // }

  const handleEdit = index => {
    setEditshow(index)
  }
  const handleDelete = index => {
    alert(billboarddata[index]._id)
    dispatch(actions.deleteOneAdvertisingPoint(billboarddata[index]._id))
  }
  return (
    <>
      <h2> שלטי חוצות פתח תקווה</h2>

      <Container>
        {/* <div className='text  top-3 mt-5'> */}
        {/* </div> */}
        {/*  <div className='text  top-0 mt-5'>
           <Form.Label>Filter by street name </Form.Label>
          <Form.Control ref={nameRef} type='text' name='name' onChange={filter} />
          <br /> */}
        {/* <Form.Label>סנן </Form.Label>
          <Form.Control ref={dataRef} type='text' name='email' onChange={filter} /> 
        </div>*/}
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
            {billboarddata &&
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
                      <td>{billBoard.status.toString()}</td>
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
