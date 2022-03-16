import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Profil from './profil'
export default function NavFunc() {
  const [isLogin, setIsLogin] = useState(false)
  const data = useSelector(state => state.user)

  useEffect(() => {
    if (data.currentUser) {
      setIsLogin(true)
    }
  }, [data.currentUser])
  const activeStyle = { color: 'pink' };
  return (
    <>
      <ul className='ul-nav'>
      <li><NavLink exact activeClassName="active" to='/Customers'>מלקוחותינו</NavLink></li>
        <li><NavLink exact activeClassName="active" to='/Campains'>קמפיינים</NavLink></li>
        <li><NavLink exact activeClassName="active" to='/Locations'>הזמנת שלט</NavLink></li>
        <li><NavLink exact activeClassName="active" to='/Graphs'>הלוחות החמים👌</NavLink></li>
        <li><NavLink exact activeClassName="active" to='/About'>אודותינו</NavLink></li>


       
        {isLogin ? <Profil /> : null}
      </ul>
    </>

  )

}
