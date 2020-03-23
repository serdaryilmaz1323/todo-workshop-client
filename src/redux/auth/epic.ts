import { Epic } from 'redux-observable';
import { AuthAction, AuthActions } from './action';
import { filter, switchMap, map, catchError, tap, ignoreElements } from 'rxjs/operators';
import { from } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AuthActionTypes } from './type';
import axios from 'axios';
import { getActionWithNotification } from '../helper/notification.helper';
import { IUser } from '../../api/models/user.model';
import { AuthService } from '../../api/services/auth.service';

const login: Epic<AuthAction, any> = actions$ =>
  actions$.pipe(
    filter(isOfType(AuthActionTypes.LOGIN)),
    switchMap(action => {
      const { history, username, password } = action.payload;

      return from(
        axios.post<{ token?: string; user?: IUser }>('/auth/login', { username, password }),
      ).pipe(
        map(result => {
          const { user, token } = result.data;

          if (!user || !token)
            throw Error('Unexpected authorization exception, please contact with system administration');

          return AuthActions.loginSuccess(history, user, token);
        }),
        catchError(err => {
          const errorMessage = err.response.data.message || '';

          return getActionWithNotification({
            action: AuthActions.loginError(errorMessage),
            notification: {
              message: errorMessage,
              type: 'error',
              title: 'Login Error',
            },
          });
        }),
      );
    }),
  );

const register: Epic<AuthAction, any> = actions$ =>
  actions$.pipe(
    filter(isOfType(AuthActionTypes.REGISTER)),
    switchMap(action => {
      const { history, username, password, firstName, lastName } = action.payload;

      return from(
        axios.post<{ token?: string; user?: IUser }>('/auth/register', {
          username,
          password,
          firstName,
          lastName,
        }),
      ).pipe(
        map(result => {
          const { user, token } = result.data;
          if (!user || !token)
            throw Error('Unexpected authorization exception, please contact with system administration');

          return AuthActions.registerSuccess(history, user, token);
        }),
        catchError(err => {
          const errorMessage = err.response.data.message || '';

          return getActionWithNotification({
            action: AuthActions.registerError(errorMessage),
            notification: {
              message: errorMessage,
              type: 'error',
              title: 'Register Error',
            },
          });
        }),
      );
    }),
  );

const loginSuccess: Epic<AuthAction> = action$ =>
  action$.pipe(
    filter(isOfType(AuthActionTypes.LOGIN_SUCCESS)),
    tap(action => {
      const { history, user, token } = action.payload;
      AuthService.setAuthenticationInfo(user, token);
      history.push('/');
    }),
    ignoreElements(),
  );
const registerSuccess: Epic<AuthAction> = action$ =>
  action$.pipe(
    filter(isOfType(AuthActionTypes.REGISTER_SUCCESS)),
    tap(action => {
      const { history, user, token } = action.payload;
      AuthService.setAuthenticationInfo(user, token);
      history.push('/');
    }),
    ignoreElements(),
  );

export const authEpics = [login, register, loginSuccess, registerSuccess];
