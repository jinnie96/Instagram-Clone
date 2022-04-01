import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UploadPostModal from "../Posts/UploadPostModal";
import LogoutButton from '../auth/LogoutButton';
import textLogo from './text-clone-logo.png';
import './AuthNav.css';


function AuthNav() {
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState('')
    const user = useSelector(state => state.session.user)
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    const showResults = (e) => {
        console.log(e.target.parentElement.childNodes[1])
        // e.target.parentElement.childNodes[1].classList.remove("results")
        e.target.parentElement.childNodes[1].style.display = "block"
        console.log(e.target.parentElement.childNodes[1])
    }

    const closeResults = (e) => {
        const results = document.querySelector('.results')
        const bar = document.querySelector('.search')
        if (e.target === results || e.target === bar || results.contains(e.target)) {
            return;
        }
        console.log(results)
        if (results) {
            results.style.display = "none"
        }
    }

    window.addEventListener("click", closeResults)

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const changeSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value)
        
    }


    return (
        <div className="auth-nav-container">
            <div className="auth-nav-sub-container">
                <a href="/">
                    <img src={textLogo} alt='text logo' className="auth-nav-logo"></img>
                </a>
                <div className="searchBar">
                    <input className="search" placeholder="Search" onClick={showResults} onChange={changeSearch}></input>
                    <div className="results">
                        <div className="empty">No results found.</div>
                    </div>
                </div>
                <div className="auth-nav-components">
                    <div id='navbar-home'>
                        <a href="/" className='i-navlink'><i className="fas fa-home i-img"></i></a>
                    </div>
                    <div id='navbar-create'>
                        <UploadPostModal className='i-navlink' />
                    </div>
                    {/* <div id='navbar-likes'> */}
                        {/* <i className="fas fa-heart i-img"></i>
                    </div> */}
                    <button onClick={openMenu} id='profile-button'>
                        <i className="fas fa-user-circle i-img"></i>
                    </button>
                    {showMenu && (
                        <div className="profile-dropdown">
                            <div>
                                <i className="fas fa-user i-img"></i>
                                <NavLink id='dropdown-navlink' to={'/profile/' + user.id}>
                                    <div>Profile</div>
                                </NavLink>
                            </div>
                            <div id='dropdown-logout'>
                                <i className="fas fa-sign-out-alt i-img"></i>
                                <LogoutButton />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthNav;
