import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';


function AuthNav({ user }) {
    const [showMenu, setShowMenu] = useState(false);
    // const dispatch = useDispatch();
    // const history = useHistory();

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

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <div className="auth-nav-container">
            <div id='navbar-home'>
                <a href="/"><i class="fas fa-home"></i></a>
            </div>
            <div id='navbar-create'>
                <a href="/create"><i class="fas fa-plus-square"></i></a>
            </div>
            <button onClick={openMenu} id='profile-button'>
                <i class="far fa-user-astronaut"></i>
            </button>
            <div className="dropdown-container">
                {showMenu && (
                    <div className="profile-dropdown">
                        {/* <li>Welcome, {user.username}!</li> */}
                        <a href='/profile'>
                            <i class="fas fa-user"></i>
                            <div>Profile</div>
                        </a>
                        <div>
                            <i class="fas fa-sign-out-alt"></i>
                            <LogoutButton />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthNav;
