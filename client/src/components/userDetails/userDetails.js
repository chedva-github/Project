import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@material-ui/icons/Save'

import actions from '../../redux/action'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function UserDetails() {
    
  const navigate = useNavigate()
  const data = useSelector(state => state)
  const dispatch = useDispatch()
   const [loading, setLoading] = React.useState(false);
      const [userdetails, setUserDetails] = React.useState({_id:data.user.currentUser?._id,name:data.user.currentUser?.name,password:data.user.currentUser?.password,creditCard:data.user.currentUser?.creditCard});
  useEffect(() => {
setLoading(false)  }, [data.user.loader]) 
   function handleClick() {
    setLoading(true);
    dispatch(actions.updateUser(userdetails))
  }
 const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    setUserDetails({ ...userdetails, [name]: value })

  }
  return (
      <div style={{width:'20%' ,marginLeft:'50%'}}className={'mt-5'}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div >
  
        <TextField 
          name="name"
          label="שם:"
          autoComplete="current-password"
          variant="filled"
          defaultValue={data.user.currentUser?.name}
          onChange={handleInputChange}
        />
        <TextField 
          name="password"
          label="         סיסמה          "
          defaultValue={data.user.currentUser?.password}
          
          variant="filled"
          type="password"
                    onChange={handleInputChange}


        />
        <TextField
          name="email"
          label="מייל"
          type="email"
          variant="filled"
                    onChange={handleInputChange}

                    defaultValue={data.user.currentUser?.email}

        />
        <TextField
          name="creditCard"
          label="פרטי אשראי"
          type="text"
          variant="filled"
            onChange={handleInputChange}

                    defaultValue={data.user.currentUser?.creditCard}
        />

         <LoadingButton
        color="secondary"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
       </div>
    </Box>
    </div>
  );
}
