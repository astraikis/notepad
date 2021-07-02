import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../actions/userActions'

function LoginScreen({ history }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <div className='login-container'>
            <p className='p-xlg'>
                <i class="fas fa-list-ul logo-icon"></i> <span className='logo-text'>notepad</span>
            </p>
            <p className='p-lg'>login</p>

            { error && <p className='password-issue'>no account found with this username and password!</p> }

            <form className='login-form' onSubmit={ submitHandler }>
                <input type='text'
                    id='username'
                    className='custom-input'
                    placeholder='username'
                    value={ username }
                    onChange={ (e) => setUsername(e.target.value) }>
                </input>
                <input type='password'
                    id='password'
                    className='custom-input'
                    placeholder='password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }>
                </input>
                <div>
                    <Link to='/register' className='link create-account-link'>create an account</Link>
                    <button type='submit' className='button-custom button-custom-blue'>login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen