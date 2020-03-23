import axios from 'axios';
import { AuthService } from './auth.service';

export const HttpService = {
  initializeAxios: () => {
    const { token } = AuthService.getAuthenticationInfo();

    axios.defaults.headers['auth'] = token;
    axios.defaults.baseURL = 'http://localhost:3019';
  },
};
