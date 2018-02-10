import React from 'react'
import logo from './RFC.png'

const Header = () => {
    return(    
            <div className="navbar sticky-top navbar-light bg-light">
                <a className="navbar-brand" href="#">
                <div className="container">
                    <img src={logo} width="150" height="75" className="d-inline-block align-top" alt="" />
                </div>
                </a>
            </div>
    )
}

export default Header