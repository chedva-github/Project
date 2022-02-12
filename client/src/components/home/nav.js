import React from "react";
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import {useSelector} from 'react-redux'


export default function NavFunc() {

  const data = useSelector(state=>state.user)
  return (
    <>      
      {data?.currentUser?
      <Nav navbar fill variant="tabs" defaultActiveKey="/Home">
        <Nav.Item>
          <Nav.Link> <Link to="/">Home</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/Sign-up">Sign up</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/Login">Login</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/About">About</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/Campains">Campains</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/Locations">Locations</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/Customers">Customers</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/Private-Area">PersonlArea</Link></Nav.Link>
        </Nav.Item>
        {data?.isAdmin?
        <Nav.Item>
          <Nav.Link><Link to="/Orders">Ordersd</Link></Nav.Link>
        </Nav.Item>:null}
      </Nav>:null}
    </>
  )
}