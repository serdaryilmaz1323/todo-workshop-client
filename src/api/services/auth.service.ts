import { IUser } from '../models/user.model';
import { HttpService } from './http.service';

export const AuthService = {
  removeAuthenticationInfo: () => {
    console.log('Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    console.log(localStorage);
    HttpService.initializeAxios();
  },
  setAuthenticationInfo: (user: IUser, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    HttpService.initializeAxios();
  },

  getAuthenticationInfo: (): { user?: IUser; token?: string } => {
    const tokenData = localStorage.getItem('token');
    const token = !!tokenData ? tokenData : undefined;

    const userData = localStorage.getItem('user');
    const user = !!userData ? JSON.parse(userData) : undefined;

    return { token, user };
  },
};
