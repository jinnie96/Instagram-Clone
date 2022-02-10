import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UploadPostModal from "../Posts/UploadPostModal";
import LogoutButton from '../auth/LogoutButton';
import textLogo from './text-clone-logo.png'
import './AuthNav.css'


function AuthNav() {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);


    return (
        <div className="auth-nav-container">
            <div className="auth-nav-sub-container">
                <a href="/">
                    <img src={textLogo} alt='text logo' className="auth-nav-logo"></img>

                </a>
                <div className="auth-nav-components">
                    <div id='navbar-home'>
                        <NavLink to="/" className='i-navlink'><i className="fas fa-home i-img"></i></NavLink>
                    </div>
                    <div id='navbar-create'>
                        <UploadPostModal className='i-navlink' />
                    </div>
                    <div id='navbar-likes'>
                        <i className="fas fa-heart i-img"></i>
                    </div>
                    <button onClick={openMenu} id='profile-button'>
                        <i className="fas fa-user-circle i-img"></i>
                    </button>
                    <div className="dropdown-container">
                        {showMenu && (
                            <div className="profile-dropdown">
                                {/* <div>Welcome, {user.username}!</div> */}
                                <NavLink to='/profile' id='dropdown-navlink'>
                                    <i className="fas fa-user i-img"></i>
                                    <div>Profile</div>
                                </NavLink>
                                <div id='dropdown-logout'>
                                    <i className="fas fa-sign-out-alt i-img"></i>
                                    <LogoutButton />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthNav;