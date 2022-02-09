import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
// import Footer from './components/Footer';
import { authenticate } from './store/session';
import NewCommentForm from './components/comments/NewComment';

import UploadPost from './components/Posts/UploadPosts';
// import ViewFollowedPosts from './components/Posts/ViewAllFollowedPosts';
import ViewAllPosts from './components/Posts/ViewAllPosts';
// Do we need the below?
// import Handle404 from './components/Handle404';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const loggedIn = useSelector(state => state.session.user)

  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/posts/:id/new-comment' exact={true}>
          <NewCommentForm />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true}>
          <h1>My Home Page</h1>
          {/* <ViewFollowedPosts /> */}
          <ViewAllPosts />
        </ProtectedRoute>
        <Route path='/create' exact={true}>
          <UploadPost />
        </Route>
      </Switch>
      {/* <Footer /> */}
      {/* <Handle404 /> */}
    </BrowserRouter>
  );
}

export default App;
