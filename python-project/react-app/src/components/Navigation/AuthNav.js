import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UploadPostModal from "../Posts/UploadPostModal";
import LogoutButton from '../auth/LogoutButton';
import textLogo from './text-clone-logo.png';
import { searchTerm } from '../../store/search'
import './AuthNav.css';


function AuthNav() {
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const directToProfPage = (e) => {
        console.log(e.target.id)
        window.location.replace(`/profile/${e.target.id}`)
    }


    useEffect(async() => {
        const noSearch = document.querySelector('.empty')
        const results = document.querySelector('.results')
        while(results.firstChild) {
            console.log(results.firstChild.class === '.empty')
            if (results.firstChild.className !== '.empty') {
                results.removeChild(results.firstChild)
            }
        }
        if (!search || search === "#") {
            results.innerHTML = '<div className="empty">No results found.</div>'
        }
        if (!search.includes("#") && search) {
            let searchObj = {search}
            console.log(typeof(searchObj))
            const searchResultsObj = await dispatch(searchTerm(searchObj))
            console.log("SEEEEEE", searchResultsObj.users)
            if (searchResultsObj.users.length === 0) results.innerHTML = '<div className="empty">No results found.</div>'
            let searchResults = searchResultsObj.users
            for (let i = 0; i < searchResults.length; i++) {
                let user = document.createElement("div")
                user.setAttribute('class', 'wholeUser')
                user.setAttribute('id', searchResults[i].id)
                user.innerHTML = '<img id="picture" src="data:image/jpeg;base64,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" alt="profile-picture" style="height: 20; width: 20;">'
                let ele = document.createElement("div")
                user.addEventListener("click", directToProfPage)
                ele.setAttribute('id', searchResults[i].id)
                ele.innerText = searchResults[i].username
                let nameEle = document.createElement("div")
                nameEle.setAttribute('id', 'searchFullName')
                nameEle.innerText = searchResults[i].first_name + ' ' + searchResults[i].last_name
                let names = document.createElement("div")
                names.setAttribute('id', 'namesBox')
                names.appendChild(ele)
                names.appendChild(nameEle)
                user.appendChild(names)
                // user.appendChild(nameEle)
                results.appendChild(user)
            }
        } else if (search.includes("#") && search.length > 1) {
            let hashtag = search.slice(1)
            console.log("TAGGGGG", hashtag)
        }
    }, [search])

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
                    <input id="searchBar" className="search" placeholder="Search" onClick={showResults} onChange={changeSearch}></input>
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
