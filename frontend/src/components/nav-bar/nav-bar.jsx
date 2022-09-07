import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './nav-bar.css'
import logo from '../../images/pizza.png'
import AuthenticationButton from '../auth-btns/auth-btns';
import { Link } from "react-router-dom";
import Profile from "../../views/profile/profile";
import SignUpButton from "../sign-up-btn/sign-up-btn";

const Nav = () => {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const logoutWithRedirect = () => logout({
        
        returnTo: window.location.origin,

    });

    return(

        <div >
            <nav className="nav-container">
                <div className="logo">   
                    <img src={logo} />
                </div>
                <div className="nav-menu"> 

                    <Link to="/">
                        HOME
                    </Link>
                    

                    { isAuthenticated && (
                        <div className="nav-menu">
                            <Link to="/order" >
                                MAKE AN ORDER
                            </Link>
                            <Link to="/profile" >
                                PROFILE
                            </Link>
                        </div>
                    )}
                
                </div>
            
            <AuthenticationButton />
                    
            { !isAuthenticated && (
                <div>
                  <SignUpButton />
                </div>
             )}
            </nav>  
            

            <Outlet/>
        </div>
    )

}

export default Nav;

