import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [biography, setBiography] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  // const updateBiography = (e) => {
  //   setBiography(e.target.value);
  // };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <form className='signup-form' onSubmit={onSignUp}>
          <div className='signup-form errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-form'>
            {/* <label>User Name</label> */}
            <input
              className='signup-inputs'
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={updateUsername}
            ></input>
          </div>
          <div className='signup-form'>
            {/* <label>User Name</label> */}
            <input
              className='signup-inputs'
              type='text'
              name='firstName'
              placeholder='First Name'
              value={firstName}
              onChange={updateFirstName}
            ></input>
          </div>
          <div className='signup-form'>
            {/* <label>User Name</label> */}
            <input
              className='signup-inputs'
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={lastName}
              onChange={updateLastName}
            ></input>
          </div>
          <div className='signup-form'>
            {/* <label>Email</label> */}
            <input
              className='signup-inputs'
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            ></input>
          </div>
          <div className='signup-form'>
            {/* <label>Password</label> */}
            <input
              className='signup-inputs'
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            ></input>
          </div>
          <div className='signup-form'>
            {/* <label>Confirm Password</label> */}
            <input
              className='signup-inputs'
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              value={repeatPassword}
              onChange={updateRepeatPassword}
              required={true}
            ></input>
          </div>
          <button className='signup-form signup-submit' type='submit'>Sign Up</button>
        </form>
        <div className='signup-policies'>By signing up, you agree to no policies.</div>
      </div>
      <div className='signup-below-container'>
        <div>Have an account?</div>
        <a href='/login'>Log in</a>
      </div>
    </div>
  );
};

export default SignUpForm;
