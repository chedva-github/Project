import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../components/home/home'
import Login from '../components/login/login'
import SignUp from '../components/login/sign-up'
import NavFunc from '../components/home/nav'
import About from '../components/about/about'
import Campains from '../components/campaigns/campaigns'
import Locations from '../components/locations/locations'
import Customers from '../components/customers/customers'
import MapGoogle from '../components/locations/googleMap'
import Orders from '../components/admin/orders'
import PersonlArea from '../components/privateArea/privateArea'
import OrderPage from '../components/orderPage/orderPage'

import OrderDetails from '../components/orderPage/orderPage'
import Payment from '../components/payment/payment'
import OrderSuccess from '../components/orderDetails/orderSuccess'
import UserDetails from '../components/userDetails/userDetails'
import Graphs from '../components/graphs/graphs'
import AcceptAdmin from '../components/admin/accept'


import { useSelector } from 'react-redux'

export default function Routers () {
  const data = useSelector(state => state.user)
  return (
    <>
      <Router>
        <NavFunc />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/MapGoogle' element={<MapGoogle />} />
          <Route path='/Orders' element={<Orders />} />
          <Route path='/Sign-up' element={<SignUp />} />
          <Route path='/Private-Area' element={<PersonlArea />} />
          <Route path='/About' element={<About />} />
          <Route path='/OrderDetails' element={<OrderDetails />} />
          <Route path='/Payment' element={<Payment />} />
          <Route path='/Campains' element={<Campains />} />
          <Route path='/Locations' element={<Locations />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/' element={<Home />} />
          <Route path='/orderPage' element={<OrderPage />} />
          <Route path='/OrderSuccess' element={<OrderSuccess />} />
          <Route path='/userDetails' element={<UserDetails />} />
          <Route path='/AcceptAdmin' element={<AcceptAdmin />} />
          <Route path='/Graphs' element={<Graphs />} />

        </Routes>
      </Router>
    </>
  )
}
