import React from 'react'
import { Link } from 'react-router-dom'
import If from '../operator/if'

export default props => (
    <li className={(window.location.pathname === props.path ? 'active' : '')}> 
        <If test={props.onclickFunction}>
            <a href='/' onClick={props.onclickFunction}>
                <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
            </a>
        </If>
        <If test={!props.onclickFunction}>
            <Link to={props.path} >
                <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
            </Link>
        </If>
    </li>
)