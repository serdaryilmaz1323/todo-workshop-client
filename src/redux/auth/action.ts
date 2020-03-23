import { ActionsUnion } from '../helper/type.helper';
import { action } from 'typesafe-actions';
import { AuthActionTypes } from './type';
import { IUser } from '../../api/models/user.model';
import { History } from 'history';

export const AuthActions = {
  login: (history: History, username: string, password: string) =>
    action(AuthActionTypes.LOGIN, { history, username, password }),
  loginSuccess: (history: History, user: IUser, token: string) =>
    action(AuthActionTypes.LOGIN_SUCCESS, { history, user, token }),
  loginError: (error: string) => action(AuthActionTypes.LOGIN_ERROR, { error }),

  register: (history: History, username: string, password: string, firstName?: string, lastName?: string) =>
    action(AuthActionTypes.REGISTER, { history, username, password, firstName, lastName }),
  registerSuccess: (history: History, user: IUser, token: string) =>
    action(AuthActionTypes.REGISTER_SUCCESS, { history, user, token }),
  registerError: (error: string) => action(AuthActionTypes.REGISTER_ERROR, { error }),

  logout: () => action(AuthActionTypes.LOGOUT),
};

export type AuthAction = ActionsUnion<typeof AuthActions>;
