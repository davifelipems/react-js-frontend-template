import React, { Component } from 'react'
import Menu from './menu'
import Logo from '../../assets/logo192.png'
import { getUser } from '../../services/auth';

export default class Sidebar extends Component{

    constructor(props) {
        super(props)
        this.state = { user: getUser()}
    }

    render() {
        return(
            <aside className='main-sidebar sidebar-dark-primary'>
                <div className="user-panel">
                    <div className="pull-left image">
                    <img src={Logo} className="img-circle" alt="User" />
                    </div>
                    <div className="pull-left info">
                    <p>{this.state.user}</p>
                    <a href="/" onClick={e => e.preventDefault()}><i className="fa fa-circle text-success"></i>Online</a>
                    </div>
                </div>
                <section className='sidebar'>
                    <Menu {...this.props} />
                </section>
            </aside>
        )
    }
}