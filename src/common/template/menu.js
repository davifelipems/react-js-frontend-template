import React, { Component } from 'react'
import MenuItem from './menuItem'
import {confirmAlertCustom} from '../../common/template/confirmAlert'

class Menu extends Component {

    confirmLogOut(e){
        e.preventDefault();
        
        confirmAlertCustom(this.logOut.bind(this),
                           'you want to log out?',
                           'Yes, i do!');
    }

    logOut(closeConfirm){
        this.props.history.push("/signout");
        closeConfirm();
    }

    render() {
        return (
        <ul className='sidebar-menu'>
            <MenuItem path='/user' label='Users' icon='user' />
            <MenuItem path='/role' label='Roles' icon='users' />
            <MenuItem path='/category' label='Categories' icon='cart-plus' />
            <MenuItem path='/signout' onclickFunction={this.confirmLogOut.bind(this)} label='Sign out' icon='sign-out' />
        </ul>
        )
    }
}

export default Menu;