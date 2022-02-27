import React, { useState, useEffect } from 'react'
import { Modal, Table, Form, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import actions from '../../redux/action'

export default function AddBillboard (props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [billboard, setBillboard] = useState({
    _id: '',
    address: '',
    size: '',
    status: '',
    price: ''
  })
  const [show, setShow] = useState(true)
  const [adressesList, setAdressesList] = useState([
    'טרומפלדור',
    'תקומה',
    'רבי דוד',
  'שבט אפרים'
  ])

  useEffect(() => {
    setShow(true)
   if(props.prop=='edit'){
    // setBillboard(data.AdvertisingPoint.advertisingPoint[props.index])
    setBillboard({
      _id: data.AdvertisingPoint.advertisingPoint[props.index]._id,
      size:data.AdvertisingPoint.advertisingPoint[props.index].size?.sizeName,
      address:data.AdvertisingPoint.advertisingPoint[props.index].address?.streetName,
      status:data.AdvertisingPoint.advertisingPoint[props.index].status,
      price:data.AdvertisingPoint.advertisingPoint[props.index].price

    })
   }
  }, [])
  const closeModal = () => {
    setShow(false)
  }
  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    setBillboard({ ...billboard, [name]: value })
       //setState({...state,sld_url: event.target.value})

  }
  const handleChangAddress = (event, value) => {
    setBillboard({ ...billboard, address: value })
  }

  const handleSubmit = async event => {
    console.log(billboard)
    props.prop == 'edit'
      ? dispatch(actions.editBillboard(billboard))
      : dispatch(actions.addBillboard(billboard))
    closeModal()
  }
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>{props.prop} billboard </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>address</Form.Label>
              <Autocomplete
                name='address'
                disablePortal
                id='text'
                options={adressesList}
                sx={{ width: 470 }}
                renderInput={params => <TextField {...params} />}
                defaultValue={
                  props.index
                    ? data.AdvertisingPoint.advertisingPoint[props.index]
                        .address?.streetName
                    : ''
                }
                onChange={handleChangAddress}
              />
              <br />
              <Form.Label>size</Form.Label>
              <Form.Control
                name='size'
                type='string'
                defaultValue={
                  props.index
                    ? data.AdvertisingPoint.advertisingPoint[props.index].size
                        ?.sizeName
                    : ''
                }
                onChange={handleInputChange}
              ></Form.Control>

              <Form.Label>price</Form.Label>

              <Form.Control
                name='price'
                type='number'
                defaultValue={
                  props.index
                    ? data.AdvertisingPoint.advertisingPoint[props.index].price
                    : ''
                }
                // defaultValue={billboard.descraption}
                onChange={handleInputChange}
              />
              <Form.Label>status</Form.Label>
              <Form.Control
                name='status'
                type='text'
                defaultValue={
                  props.index
                    ? data.AdvertisingPoint.advertisingPoint[props.index].status
                    : ''
                }
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}