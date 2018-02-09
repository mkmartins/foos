import React from 'react'
import logo from './RFC.png'

const Header = () => {
    return(    
            <div class="navbar sticky-top navbar-light bg-light">
                <a class="navbar-brand" href="#">
                <div class="container">
                    <img src={logo} width="150" height="75" class="d-inline-block align-top" alt="" />
                </div>
                </a>
            </div>
    )
}

export default Header