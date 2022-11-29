import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthNav from './AuthNav';
// import UploadPostModal from '../Posts/UploadPostModal';

const NavBar = ({ loaded }) => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <AuthNav />
        {/* <UploadPostModal /> */}
        {/* <NavLink to="/create">Upload</NavLink> */}
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
