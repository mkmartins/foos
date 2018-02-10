import React from 'react'
import logo from './RFC.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return(    
            <nav className="navbar sticky-top navbar-light bg-light">
                <Link to="/">
                    <img src={logo} width="150" height="75" className="d-inline-block align-top" alt="" />
                </Link>
                <span class="navbar-text">
                    <Link className="nav-link disabled" to="/about">
                        Meet the Players
                    </Link>
                </span>
            </nav>
    )
}

export default Header