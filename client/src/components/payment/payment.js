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

export default function Payment(props) {
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
  const size = "tuyucux"
  
  useEffect(() => {
    setSum(data.AdvertisingPoint.currentAdvertstingPoint.price)

    setCreateOrderObj({
      userId: data.user.currentUser?._id,
      AdvertisingPointId: data.AdvertisingPoint.currentAdvertstingPoint._id,
      startDate: data.order.startDate,
      endDate: data.order.endDate,
      img: data.order.orderImg
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
   
    dispatch(actions.addOrder(createOrderObj))
    navigate('/OrderSuccess')
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
    
      <div id='PaymentForm' key='Payment'>
        <div className='App-payment'>
       
          <div className='form-payment'>
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
                <div className='col-6 form-group'>
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
                </div>
                <div className='col-6 form-group'>
                  <input
                    type='tel'
                    name='expiry'
                    className='form-control'
                    placeholder='תוקף'
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
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className='col-6 form-group'>
                  <input
                    type='number'
                    name='sum'
                    className='form-control'
                    placeholder='הסכום לתשלום'
                    value={sum}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className='col-12 form-group'>
                  <input
                    type='text'
                    name='name'
                    className='form-control-name'
                    placeholder='שם בעל האשראי'
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>

                <input type='hidden' name='issuer' value={issuer} />
                <div className=' btn-f'>

                  <div className='form-actions col-12'>
                    <button type='submit' className='btn btn-primary btn-block'>

                      אשור
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {formData && (
            <div className='App-highlight'>
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr className='btn-hr' style={{ margin: '60px 0 30px' }} />
        </div>
      </div>
    </>
  )
}
