import React from "react";
import logo from '../images/logo.svg';
import '../css/component/navbar.css';

function NavBar(){
    return(
        <nav>
        <img src={logo} alt="jobster-logo"></img>
    </nav>
    )
}

export default NavBar;