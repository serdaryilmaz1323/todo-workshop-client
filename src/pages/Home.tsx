import React from 'react';
import { AuthService } from '../api/services/auth.service';
import { useTypeSelector } from '../redux/helper/selector.helper';
import { useDispatch } from 'react-redux';
// import { AuthActions } from '../redux/auth/action';
import { AuthActionTypes } from '../redux/auth/type';
import { action } from 'typesafe-actions';
import TodoContainer from '../components/todo/TodoContainer';

const Home = () => {
  const userState = useTypeSelector(s => s.authState.authUser);
  const { user } = AuthService.getAuthenticationInfo();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(action(AuthActionTypes.LOGOUT));
    //dispatch(AuthActions.logout);
  };

  return (
    <div>
      Home Page
      <div>Current localstorage user : {user?.firstName} </div>
      <div>Current state user : {userState?.firstName} </div>
      <button onClick={logout}>Logout</button>
      <hr></hr>
      <TodoContainer />
    </div>
  );
};

export default Home;
