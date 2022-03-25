

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import actions from '../../redux/action'
import './graphs.css'
export default function Graphs(props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [popularity, setPopularity] = useState()

  useEffect(() => {

    dispatch(actions.getPopularityBb())

  }, [])
  useEffect(() => {
    if (data.AdvertisingPoint?.popularityBB) {
      let toSort = [...data.AdvertisingPoint.popularityBB]
      toSort.sort((a, b) => a.count > b.count ? 1 : -1).reverse()

      setPopularity(toSort)
    }

  }, [data.AdvertisingPoint?.popularityBB])
  return (
    <div className='graph-head'>
      <h1 className='h1'> :שלושת נקודות פירסום שלנו מוזמנים להתרשם</h1>

      <div className='graph'>
        {popularity &&

          popularity.map((p, index) => {
            if(index>2)return
            return (
              <div className='graph-item'>

                <h2 className='h2'>{p.AP.address.streetName}</h2>
                <p className='h2'>------------------------------------</p>
                {p.count > 1 ?
                  <h3 className='h2'> הוזמן {p.count} פעמים </h3> : <h3 className='h2'>הוזמן פעם אחת</h3>}
              </div>
            )
          })}
      </div>
    </div>

  )
}
