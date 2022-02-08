import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoButton from './DemoUser'
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <form className='login-form' onSubmit={onLogin}>
          <div className='login-form errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-form'>
            {/* <label className='login-labels' htmlFor='email'>Email</label> */}
            <input
              className='login-inputs'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-form'>
            {/* <label className='login-labels' htmlFor='password'>Password</label> */}
            <input
              className='login-inputs'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className='login-form login-submit' type='submit'>Log In</button>
          <DemoButton/>
        </form>
      </div>
      <div className='login-below-container'>
        <div>Don't have an account?</div>
        <a href='/sign-up'>Sign up</a>
      </div>
    </div>
  );
};

export default LoginForm;
