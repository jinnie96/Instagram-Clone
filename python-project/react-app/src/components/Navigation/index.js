import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthNav from './AuthNav';
import UploadPictureModal from '../FileUploadModal/UploadPicture';
// import LogoutButton from '../auth/LogoutButton';
import './Navigation.css'
import UploadPicture from '../FileUploadModal/UploadPictureModal';

const NavBar = ({ loaded }) => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <AuthNav user={user} />
    );
  } else {
    sessionLinks = (
      <>
        <UploadPictureModal />
        <NavLink to="/create/select">Upload</NavLink>
      </>
    )
  }


  return (
    <>
      {loaded && sessionLinks}
    </>
    // <nav>
    //   <ul className='navbar-list'>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
