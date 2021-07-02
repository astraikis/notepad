import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../actions/userActions'

import { USER_REGISTER_RESET } from '../constants/userConstants'

function RegisterScreen({ history }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [passwordIssue, setPasswordIssue] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { loading: registerLoading, error: registerError } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password === repeatPassword) {
            dispatch(register(username, password, history))
            history.push('/')
        } else {
            setPasswordIssue(true)
        } 
    }

    return (
        <div className='login-container'>
            <p className='p-xlg'>
                <i class="fas fa-list-ul logo-icon"></i> <span className='logo-text'>notepad</span>
            </p>
            <p className='p-lg'>create an account</p>

            <form className='login-form' onSubmit={ submitHandler }>
                <input type='text'
                    id='username'
                    className='custom-input'
                    placeholder='username'
                    value={ username }
                    onChange={ (e) => setUsername(e.target.value) }>
                </input>
                { registerError && <p className='password-issue'>{ registerError }</p> }
                <input type='password'
                    id='password'
                    className='custom-input'
                    placeholder='password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }>
                </input>
                <input type='password'
                    id='repeat-password'
                    className='custom-input'
                    placeholder='repeat password'
                    value={ repeatPassword }
                    onChange={ (e) => setRepeatPassword(e.target.value) }>
                </input>
                { passwordIssue && <p className='password-issue'>your passwords don't match!</p> }
                <div>
                    <Link to='/login' className='link create-account-link'>login</Link>
                    <button type='submit' className='button-custom button-custom-blue'>register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen