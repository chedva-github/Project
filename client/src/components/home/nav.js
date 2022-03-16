import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Profil from './profil'
export default function NavFunc () {
  const [isLogin, setIsLogin] = useState(false)
  const data = useSelector(state => state.user)
  useEffect(() => {
    if(data.currentUser){
    setIsLogin(true)
    }
  },[data.currentUser])
  return (
    <>
      <Nav navbar fill variant='tabs' defaultActiveKey='/Home'>
       
        {/* <Nav.Item>
          <Nav.Link>
            {' '}
            <Link to='/'>Home</Link>
          </Nav.Link>
        </Nav.Item> */}
        {/* <Nav.Item>
          <Nav.Link>
            <Link to='/Sign-up'>Sign up</Link>
          </Nav.Link>
        </Nav.Item> */}
         
        {/* <Nav.Item>
          <Nav.Link>
            <Link to='/Login'>כניסה</Link>
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link>
            <Link to='/About'>אודותינו</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to='/Campains'>קמפיינים</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to='/Locations'>הזמנת שלט</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to='/Customers'>מלקוחותינו</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to='/Graphs'>הלוחות החמים👌</Link>
          </Nav.Link>
        </Nav.Item>
      
      {isLogin? <Profil />:null}

      </Nav>
    </>
  )
}
