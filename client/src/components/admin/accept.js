import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import './accept.css';
import actions from '../../redux/action'

export default function AcceptAdmin() {
  const [state, setState] = useState(false)
  const data = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getOrdersAwaitToAccept())
  }, [])
  useEffect(() => {
    if (data.order.awaitToAccept) setState(data.order.awaitToAccept)
  }, [data.order.awaitToAccept])
  function accept(val) {
    console.log(val)
    dispatch(actions.changeAccept({ accept: '1', orderId: val }))
  }
  function notAccept(val) {
    dispatch(actions.changeAccept({ accept: '0', orderId: val }))
  }
  return (
    <>
      {state.length > 0 ? (
        <h1>הזמנות אלו מחכות לאישור</h1>
      ) : (
        <h1>אין הזמנות שמחכות לאישורך כרגע</h1>
      )}
      <div className='accept-admin'>
        {state &&
          state.map((value, index) => {
            return (
              <div className='accept-item'>
                <Card sx={{ maxWidth: 345 }} style={{ diraction: 'right' }}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={value.img}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      :הזמנה ממתינה לאישורך ${value._id.slice(4)}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {value.AdvertisingPointId.size.sizeName}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {value.endDate.split('T')[0]} בין התאריכים:
                      {value.startDate.split('T')[0]} ל
                    </Typography>
                  </CardContent>
                  <CardActions className='btn'>
                    <Button size='large' onClick={e => accept(value._id)}>
                      מאשר
                    </Button>
                    <Button size='large' onClick={e => notAccept(value._id)}>
                      לא מאשר
                    </Button>
                  </CardActions>
                </Card>
              </div>
            )
          })}
      </div>
    </>
  )
}
