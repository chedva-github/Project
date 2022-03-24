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
export default function Location (props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [arrSize, setArrSize] = useState([])
  const [arrStreet, setArrStreet] = useState([])
  const [date, setDate] = useState()
  const [price, setPrice] = useState(null)

  const [priceshow, setPriceshow] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(action.getAllStreets())
    dispatch(action.getAllSize())
  }, [])

  useEffect(() => {
    if (data.size.size) {
      let size1 = data.size.size.map(si => si.sizeName)
      console.log(size1)
      setArrSize(size1)
    }
  }, [data.size?.size])
  useEffect(() => {
    dispatch(action.setVailableToNull())
    if (data.order.available == 200) {
      navigate('/Payment')
    }
    if (data.order.available == 401) {
      alert('שלט זה תפוס בתאריכם שביקשת')
    }
    if (data.order.available == 403) {
      alert(' וודא שהינך מחובר לאתר קרתה בעיה, אנא נסה שנית')
    }
  }, [data.order.available])

  useEffect(() => {
    if (data.streets.streets) {
      let streets1 = data.streets.streets.map(street => street.streetName)
      setArrStreet(streets1)
      console.log('sreets1', streets1)
    }
  }, [data.streets?.streets])

  function sortStreet (size) {
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
  function priceLable (e) {
    setPriceshow(true)
  }

  function sortSize (street) {
    var sizeFromAdvertisingPoing = []
    var pri
    data?.AdvertisingPoint?.advertisingPoint.map(x => {
      if (x.address?.streetName == street) {
        dispatch(action.setStreet(x.address))
        dispatch(action.setPrice(x.price))
        setPrice(x.price)

        pri = x.price
        sizeFromAdvertisingPoing.push(x.size.sizeName)
      }
    })
    console.log('sizeFromAdvertisingPoing', sizeFromAdvertisingPoing)
    setArrSize(sizeFromAdvertisingPoing)
  }
  async function submit () {
    const currentAP = await data.AdvertisingPoint.advertisingPoint.filter(
      x =>
        x.address._id == data.order.orderStreet._id &&
        x.size._id == data.order.orderSize._id
    )
    console.log('currentAP', currentAP)
    if (currentAP[0]) {
      await dispatch(action.setCurrentAdvertstingPoint(currentAP[0]))

      dispatch(action.checkApAvilable())
    }
  }
  const uploadImg = async files => {}
  return (
    <div className='location-container'>
      <div className='map'>
        <MyMapComponent></MyMapComponent>
      </div>
      <br />
      <br />
      <br />
      <br />

      <DateRange />
      <br />

      <input
        list='ice'
        id='ice-cream'
        onChange={e => sortSize(e.target.value)}
        defaultValue={
          data?.street?.street?.find(
            x => x._id == data?.AdvertisingPoint?.street
          )?.streetName
        }
        className='input-loc'
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
        onBlur={priceLable}
        defaultValue={
          data?.size?.size?.find(x => x._id == data?.AdvertisingPoint?.size)
            ?.sizeName
        }
        name='size'
        className='input-loc'
        placeholder='בחר גודל'
      />
      <datalist id='ice2'>
        {arrSize?.map((item, key) => {
          return <option key={key} value={item}></option>
        })}
      </datalist>
      <br />

      <UploadImg />
      <br />
      {priceshow ? <lable>{price} המחיר לשלט הינו:</lable> : null}
      <button
        className='btn-location'
        //  disabled={!street || !date || !size}
        onClick={submit}
      >
        לתשלום
      </button>
      {/* </form> */}
    </div>
  )
}
