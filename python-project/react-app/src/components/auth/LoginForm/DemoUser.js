import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

const DemoButton = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  let email
  const handleDemo = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users/');
    const responseData = await response.json();
    responseData.users.map((user) => {
      if (user.id == 1) {
        email = user.email
      }
    })
    // const email = responseData.users[7].email
    const password = 'password'
    await dispatch(login(email, password));

  };

  if (user) {
    return <Redirect to='/' />;
  }

  return <button id='demo-btn' onClick={handleDemo}>Demo User</button>;
}


export default DemoButton;
