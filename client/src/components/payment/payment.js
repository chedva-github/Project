//props?.location?.state?.street
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from 'react-credit-cards'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from './utils'
import 'react-credit-cards/es/styles-compiled.css'
import './payment.css'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/action'

export default function Payment (props) {
  const navigate = useNavigate()
  const { state } = useLocation()
  // const { date, size, street } = state
  const data = useSelector(state => state)
  const dispatch = useDispatch()
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [issuer, setIssuer] = useState('')
  const [focused, setFocused] = useState('')
  const [formData, setFormData] = useState(null)
  const [sum, setSum] = useState(0)
  const [random, setRandom] = useState(0)
  const [createOrderObj, setCreateOrderObj] = useState()

  const form = useRef()
  const date = data.AdvertisingPoint.currentAdvertstingPoint.startDate
  const street = data.AdvertisingPoint.currentAdvertstingPoint.street
  const size ="tuyucux"
  useEffect(() => {

    if (data.order.available == 200) return navigate('/OrderSuccess')
    if (data.order.available == 401) {
      alert('שלט זה תפוס בתאריכם שביקשת')
      return navigate('/Locations')
    }
    if (data.order.available == 403) {
      alert(' וודא שהינך מחובר לאתר קרתה בעיה, אנא נסה שנית')
      return navigate('/Locations')
    }
  }, [data.order.available])

  useEffect(() => {
    setSum(data.AdvertisingPoint.currentAdvertstingPoint.price)
      // data?.AdvertisingPoint?.advertisingPoint.find(
      //   x =>
      //     x.address ==
      //     data?.streets?.streets.find(s => s.streetName == street)._id
      // )?.basicPriceWeek
    //)
    setCreateOrderObj({
      userId: data.user.currentUser._id,
      AdvertisingPointId: data.AdvertisingPoint.currentAdvertstingPoint._id,
      startDate: data.order.startDate,
      endDate: data.order.endDate,
      img:data.order.orderImg
    })
    console.log(state)
  }, [])

  const handleInputFocus = ({ target }) => {
      setFocused(target.name)
  }

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    // let u = {}
    // u.userId = data?.user?.currentUser
    // u.paymentNum = sum
    // u.endDate = date
    // u.startDate = date
    // u.pointId = data?.AdvertisingPoint?.advertisingPoint.find(
    //   x =>
    //     x.address ==
    //     data?.streets?.streets.find(s => s.streetName == street)._id
    // )?._id
    // dispatch(actions.createRentToUser(u))
    // navigate('/Private-Area')
    dispatch(actions.addOrder(createOrderObj))
  }

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
      setNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
      setCvc(target.value)
    } else if (target.name === 'name') {
      setName(target.value)
    }
  }
  return (
    <>
      {/* <h1>{street}</h1>
      <h1>{size}</h1>
      <h1>{date}</h1> */}
      <div id='PaymentForm' key='Payment'>
        <div className='App-payment'>
          {/* <h1> student payment:הסכום לתשלום הוא</h1> */}
          {/* onSubmit={this.handleSubmit} */}
          <form ref={form} onSubmit={handleSubmit}>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={handleCallback}
              sum={sum}
            />
            <div className='row'>
              <div className='form-group col-12'>
                <input
                  type='tel'
                  name='number'
                  className='form-control'
                  placeholder='הכנס מספר אשראי'
                  pattern='[\d| ]{16,22}'
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <small>Ex.: 36., 37., 41., 51., 60...</small>
              </div>
              <div className='form-group col-12'>
                <input
                  type='number'
                  name='sum'
                  className='form-control'
                  placeholder='הסכום לתשלום'
                  value={sum}
                  readonly
                  // onFocus={handleInputFocus}
                />
              </div>
              <div className='form-group col-12'>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='שם בעל האשראי'
                  required
                  //   disabled={checkSum()}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className='col-6 form-group'>
                <input
                  type='tel'
                  name='expiry'
                  className='form-control'
                  placeholder='תאריך תפוגה'
                  pattern='\d\d/\d\d'
                  required
                  //   disabled={checkSum()}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className='col-6 form-group'>
                <input
                  type='tel'
                  name='cvc'
                  className='form-control'
                  placeholder='CVC'
                  pattern='\d{3,4}'
                  required
                  //   disabled={checkSum()}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <input type='hidden' name='issuer' value={issuer} />
              <div className='form-actions col-12'>
                <button type='submit' className='btn btn-primary btn-block'>
                  אשור
                </button>
              </div>
            </div>
          </form>
          {formData && (
            <div className='App-highlight'>
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: '60px 0 30px' }} />
        </div>
      </div>
    </>
  )
}
