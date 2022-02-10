import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthNav from './AuthNav';
import UploadPictureModal from '../FileUploadModal/UploadPicture';
// import LogoutButton from '../auth/LogoutButton';
import './Navigation.css'
// import UploadPicture from '../FileUploadModal/UploadPictureModal';

const NavBar = ({ loaded }) => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <AuthNav user={user} />
        <UploadPictureModal />
        <NavLink to="/create">Upload</NavLink>
      </>
    );
  } else {
    sessionLinks = (
      <>
      </>
    )
  }


  return (
    <>
      {loaded && sessionLinks}
    </>
  );
}

export default NavBar;
