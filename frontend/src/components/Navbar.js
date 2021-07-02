import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../actions/userActions'

function Navbar() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>
            <div className='navbar-custom'>
                <ul className='navbar-custom-nav'>
                    <div className='navbar-custom-left'>
                        <li className='nav-item'>
                            <a href='/' className='logo-link p-lg'>
                                <i class="fas fa-list-ul logo-icon"></i> <span className='logo-text'>notepad</span>
                            </a>
                        </li>
                    </div>

                    <div className='navbar-custom-right'>
                        <li className='nav-item'>
                            <button onClick={ logoutHandler } className='button-custom button-custom-blue'>logout</button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Navbar