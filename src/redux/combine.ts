import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { appReducer } from './app/reducer';
import { appEpics } from './app/epic';
import { authEpics } from './auth/epic';
import { authReducer } from './auth/reducer';

export const rootEpic = combineEpics<any>(...appEpics, ...authEpics);

export const rootReducer = combineReducers({
  appState: appReducer,
  authState: authReducer,
});
