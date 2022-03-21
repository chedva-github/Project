import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import action from '../../redux/action'
import { getUserById } from "../../service/api"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const data = useSelector(state => state.user)

    async function initUser(form) {
        form.preventDefault()
        console.log("i a here!", form)
        let user = {}
        user.name = name
        user.password = password
        // const res = await getUserById(user.name);
        // console.log(res);
        dispatch(action.login(user))
    }

    if (data?.currentUser && !data?.isAdmin)
        navigate('/About')
    else
        if (data?.isAdmin)
            navigate('/Orders')

    return (
        <div className='container-home'>
            <div className='container-login'>
                <form className="center" onSubmit={(e) => initUser(e)}>
                    <InputLabel>הרשמה לאתר!</InputLabel>
                    <TextField value={name} onChange={(e) => { setName(e.target.value) }} className="element" id="outlined-basic" label="שם" variant="outlined" type="text" placeholder="הכנס שם" />
                    <br />
                    <TextField value={password} onChange={(e) => { setPassword(e.target.value) }} className="element" id="outlined-basic" label="סיסמה" variant="outlined" type="password" placeholder="הכנס סיסמה" />
                    <br />
                    <div className='enter'>
                        <Button type="submit" className="element" variant="contained" color="primary">כניסה </Button>

                    </div>
                    <div className='new-client'>
                        <Button type='button' onClick={() => navigate('/Sign-up')} className="element" variant="text" color="secondary"> אין לך חשבון? </Button>
                    </div>
                </form>
            </div>
            {/* {data.currentUser.name? */}
            {/* <h2>hello {data.currentUser?.name}</h2> */}
            {/* :null} */}
        </div>
    )
}