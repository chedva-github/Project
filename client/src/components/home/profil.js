import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import actions from '../../redux/action'
import './profil.css'

export default function Profil () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()
  const data = useSelector(state => state)
  const dispatch = useDispatch()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogOut = () => {
    handleClose()
    navigate('./')
    window.location.reload()

    // dispatch(actions.logOut())
  }
  const handleEdit = () => {
    navigate('./userDetails')
  }
  const handleToOrders = () => {
    navigate('./orders')
  }
  const handleToAdmin = () => {
    navigate('./Private-Area')
  }

  return (
    <>
      <div class='profil'>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {data.user.currentUser?.name[0]}
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleEdit}>עריכת פרטים</MenuItem>
          <br />
          <MenuItem onClick={handleToOrders}>הזמנות שלי</MenuItem>
          <br />          
              <MenuItem onClick={handleToAdmin}>שלטים למנהל</MenuItem>
            
          
      
          <MenuItem onClick={handleLogOut}>יציאה</MenuItem>
        </Menu>
      </div>
    </>
  )
}
