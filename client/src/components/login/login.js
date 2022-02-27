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
        navigate('/Private-Area')
    else
        if (data?.isAdmin)
            navigate('/Orders')

    return (
        <div>
            <form className="center" onSubmit={(e) => initUser(e)}>
                <InputLabel>הרשמה לאתר!</InputLabel>
                <br />
                <br />
                <TextField value={name} onChange={(e) => { setName(e.target.value) }} className="element" id="outlined-basic" label="name" variant="outlined" type="text" placeholder="enter name" />
                <br />
                <br />
                <TextField value={password} onChange={(e) => { setPassword(e.target.value) }} className="element" id="outlined-basic" label="password" variant="outlined" type="password" placeholder="enter password" />
                <br />
                <br />
                <Button type="submit" className="element" variant="contained" color="primary">כניסה </Button>
                <br />
                <br />
                <Button type='button' onClick={()=>navigate('/Sign-up')} className="element" variant="contained" color="primary"> אין לך חשבון? </Button>

            </form>
            <h1>hello {data.currentUser?.name}</h1>
        </div>
    )
}