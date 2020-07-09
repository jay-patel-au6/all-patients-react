import React from 'react'
import {NavLink} from 'react-router-dom'

import './../styles/Navbar.css'

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-light bg-light Navbar">
            <NavLink to='/' className="navbar-brand NavLink" style={{marginRight: '0px'}}><i><strong>Taking care</strong></i> Hospital</NavLink>
            <div>
                {props.children}
            </div>
        </nav>
    )
}
