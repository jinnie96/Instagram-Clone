import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/ProfilePage/UsersList';
import User from './components/ProfilePage/User';
import { authenticate } from './store/session';
import NewCommentForm from './components/comments/NewComment';
import ViewPosts from './components/Posts/ViewPosts';
// import Handle404 from './components/Handle404';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  // const user = useSelector(state => state.session.user);

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
        <ProtectedRoute path='/profile/:userId' exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true}>
          <ViewPosts />
        </ProtectedRoute>
      </Switch>
      {/* <Handle404 /> */}
    </BrowserRouter>
  );
}

export default App;
