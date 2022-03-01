import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'

import MyMapComponent from './googleMap'
import './locations.css'
import action from '../../redux/action'

import DateRange from './datePicker'
export default function Location (props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [arrSize, setArrSize] = useState()
  const [size, setSize] = useState()
  const [arrStreet, setArrStreet] = useState([])
  const [street, setStreet] = useState()
  const [date, setDate] = useState()
  const navigate = useNavigate()

  useEffect(async () => {
    await dispatch(action.getAllStreets())
    await dispatch(action.getAllSize())
  }, [])

  useEffect(() => {
    setArrSize(data?.size?.size)
  }, [data?.size?.size])

  useEffect(() => {
    let streets = data.streets.streets.map(street => street.streetName)

    setArrStreet(streets)
  }, [data.streets?.streets])

  const handleChangAddress = () => {
    alert('ssd')
  }

  function sortStreet (size) {
    var streetFromAdvertisingPoing = []
    data?.AdvertisingPoint?.advertisingPoint.map(x => {
      if (x.size.sizeName == size) {
        dispatch(action.setSize(x.size))
        streetFromAdvertisingPoing.push(x.address.streetName)
      }
    })

    setArrStreet(streetFromAdvertisingPoing)
  }
  function sortSize (street) {
    //   debugger
    // let arr = arrSize.filter(
    //   x =>
    //     data?.AdvertisingPoint?.advertisingPoint.find(
    //       i =>
    //         i.size == x._id &&
    //         i.address == arrStreet.find(x => x.streetName == street)?._id
    //     ) != undefined
    // )
    // setArrSize(arr)
    // setStreet(street)
    var sizeFromAdvertisingPoing = []
    data?.AdvertisingPoint?.advertisingPoint.map(x => {
      if (x.address?.streetName == street) {
        dispatch(action.setStreet(x.address))
        dispatch(action.setPrice(x.price))
        sizeFromAdvertisingPoing.push(x.size.sizeName)
      }
    })
    console.log('sizeFromAdvertisingPoing', sizeFromAdvertisingPoing)
    setArrSize(sizeFromAdvertisingPoing)
  }
  const submit = async () => {
    const currentAP = await data.AdvertisingPoint.advertisingPoint.filter(
      x =>
        x.address._id == data.order.orderStreet._id &&
        x.size._id == data.order.orderSize._id
    )
    console.log('currentAP', currentAP)
    // if(!currentAP.status){
    dispatch(action.setCurrentAdvertstingPoint(currentAP[0]))
        navigate('/orderPage')

   // }
    //else
    //  alert('שלט זה תפוס כבר')
  }
  return (
    <div>
      <MyMapComponent></MyMapComponent>

      <div className='topcorner '>
        <h2>Location</h2>
        <br />
        <DateRange />

        <br />
        {/* <Autocomplete
          name='address'
          disablePortal
          id='text'
          options={arrStreet?arrStreet:null}
          sx={{ width: 470 }}
          renderInput={params => <TextField {...params} />}
          // defaultValue={
          //   props.index
          //     ? data.AdvertisingPoint.advertisingPoint[props.index]
          //         .address?.streetName
          //     : ''
          // }
          onChange={handleChangAddress}
        /> */}
        <br />
        <div>
          <input
            id='ice-cream-choice'
            onChange={e => sortSize(e.target.value)}
            placeholder='בחר רחוב'
          />
          <datalist>
            {arrStreet?.map((item, key) => {
              return <option key={key} value={item}></option>
            })}
          </datalist>
        </div>
        <br />
        <div>
          <input
            list='ice'
            id='ice-cream'
            onChange={e => sortStreet(e.target.value)}
            defaultValue={
              data?.size?.size?.find(x => x._id == data?.AdvertisingPoint?.size)
                ?.sizeName
            }
            name='ice-cream'
            placeholder='בחר גודל'
          />
          <datalist id='ice'>
            {arrSize?.map((item, key) => {
              // data?.size?.size?.map((item, key) => {
              return <option key={key} value={item.sizeName}></option>
            })}
          </datalist>
        </div>
        <button
          //  disabled={!street || !date || !size}
          onClick={submit}
        ></button>
      </div>
    </div>
  )
}
