import { HttpService } from './http.service';

export const AppService = {
  initializeApp: () => {
    HttpService.initializeAxios();
  },
};
