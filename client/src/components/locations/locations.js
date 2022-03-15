import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import MyMapComponent from './googleMap'
import './locations.css'
import action from '../../redux/action'
import UploadImg from './uploadImg'
import DateRange from './datePicker'
export default function Location(props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [arrSize, setArrSize] = useState([])
  const [arrStreet, setArrStreet] = useState([])
  const [date, setDate] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(action.getAllStreets())
    dispatch(action.getAllSize())
  }, [])

  useEffect(() => {
    if (data.size.size) {

      let size1 = data.size.size.map(si => si.sizeName)
      console.log(size1);
      setArrSize(size1)
    }
  }, [data.size?.size])

  useEffect(() => {
    if (data.streets.streets) {
      let streets1 = data.streets.streets.map(street => street.streetName)
      setArrStreet(streets1)
      console.log('sreets1', streets1)

    }

  }, [data.streets?.streets])

  const handleChangAddress = () => {
    alert('ssd')
  }

  function sortStreet(size) {
    var streetFromAdvertisingPoing = []
    data?.AdvertisingPoint?.advertisingPoint.map(x => {
      if (x.size.sizeName == size) {
        dispatch(action.setSize(x.size))
        streetFromAdvertisingPoing.push(x.address.streetName)
      }
    })

    console.log(streetFromAdvertisingPoing)
    setArrStreet(streetFromAdvertisingPoing)
  }
  function sortSize(street) {
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
  async function submit() {
    const currentAP = await data.AdvertisingPoint.advertisingPoint.filter(
      x =>
        x.address._id == data.order.orderStreet._id &&
        x.size._id == data.order.orderSize._id
    )
    console.log('currentAP', currentAP)
    if (currentAP[0]) {
      dispatch(action.setCurrentAdvertstingPoint(currentAP[0]))
      navigate('/orderPage')
    }
  }
  const uploadImg = async files => {
    alert(files.target.value)
  }
  return (
    <div>
      <div className='location-container'>


        <div className='map'>
          <MyMapComponent></MyMapComponent>
        </div>
        <div className='topcorner '>
          <br />
          <DateRange />
          <br />
          <div className='input-location'>
            <input
              list='ice'
              id='ice-cream'
              onChange={e => sortSize(e.target.value)}
              defaultValue={
                data?.street?.street?.find(x => x._id == data?.AdvertisingPoint?.street)
                  ?.streetName
              }
              name='ice-cream'
              placeholder='בחר רחוב'
            />
            <datalist id='ice'>
              {arrStreet?.map((item, key) => {
                return <option key={key} value={item}></option>
              })}
            </datalist>

            <input
              list='ice2'
              onChange={e => sortStreet(e.target.value)}
              defaultValue={
                data?.size?.size?.find(x => x._id == data?.AdvertisingPoint?.size)
                  ?.sizeName
              }
              name='size'
              placeholder='בחר גודל'
            />
            <datalist id='ice2'>
              {arrSize?.map((item, key) => {
                return <option key={key} value={item}></option>
              })}
            </datalist>
          </div>

          <UploadImg />
          <button
            className='btn-location'
            //  disabled={!street || !date || !size}
            onClick={submit}
          >לתשלום</button>
        </div>
      </div>
    </div>
  )
}
