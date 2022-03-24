

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import actions from '../../redux/action'

export default function Graphs (props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [popularity, setPopularity] = useState()

  useEffect(()=>{
    
    dispatch(actions.getPopularityBb())

  },[])
  useEffect(() => {
    if(data.AdvertisingPoint?.popularityBB){
  let toSort = [...data.AdvertisingPoint.popularityBB]
         toSort.sort((a, b) => a.count > b.count ? 1 : -1).reverse()

    setPopularity(toSort)
    }

  }, [data.AdvertisingPoint?.popularityBB])
  return (
    <div className=''>
      {popularity &&
       popularity.map((p, index) => {
          return (
            <>
              <h2>{p.count}</h2>
              <h3>{p.AP.address.streetName}</h3>
              <p>------------------------------------</p>
            </>
          )
        })}
    </div>
  )
}
