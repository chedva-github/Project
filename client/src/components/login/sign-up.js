import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import action from '../../redux/action'
import './login.css'

export default function SignUp() {

    const dispatch = useDispatch()
    const data = useSelector(state => state.user)

    function initUser(form) {
        form.preventDefault()
        // debugger
        let user = {}
        user.name = form.target.name.value;
        user.password = form.target.password.value;
        user.email = form.target.email.value;
        dispatch(action.createUser(user))
    }

    return (
        <div className='container-home'>
            {/* <h1>hello {data.currentUser?.name}</h1> */}
            <div className='container-sign-in'>
                <form className="center" onSubmit={(e) => initUser(e)}>
                    <input className='input-sign-in' id="name" type="text" placeholder="הכנס שם"></input>
                    <input className='input-sign-in' id="password" type="password" placeholder="הכנס סיסמה"></input>
                    <input className='input-sign-in' id="email" type="email" placeholder="הכנס כתובת מייל"></input>
                    <button className='btn-sign-in' type="submit">להירשם</button>
                </form>
            </div>
        </div>
    )
}