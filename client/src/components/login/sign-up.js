import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import action from '../../redux/action'

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
        <>
            <form onSubmit={(e) => initUser(e)}>
                <input id="name" type="text" placeholder="enter name"></input>
                <input id="password" type="password" placeholder="enter password"></input>
                <input id="email" type="email" placeholder="enter email"></input>
                <button type="submit">להירשם</button>
            </form>
            <h1>hello {data.currentUser?.name}</h1>
        </>
    )
}