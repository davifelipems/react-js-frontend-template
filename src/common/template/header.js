import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
    <header className='main-header'>
        <Link to='/app' className='logo'>
            <span className='logo-mini'>
                <i className='fa fa-paste'></i>
            </span>
            <span className='logo-lg'>
                <i className='fa fa-paste'></i>
                <b> React</b>
            </span>
        </Link>
        <nav className='navbar navbar-static-top'>
            <a href='/' onClick={e => e.preventDefault()} className='sidebar-toggle' data-toggle='offcanvas'>&nbsp;</a>
        </nav>
    </header>
)