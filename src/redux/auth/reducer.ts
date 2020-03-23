import { IUser } from '../../api/models/user.model';
import { Reducer } from 'typesafe-actions';
import { AuthAction } from './action';
import { AuthActionTypes } from './type';
import { AuthService } from '../../api/services/auth.service';

export interface AuthState {
  error?: string;
  loading: boolean;
  authUser?: IUser;
  token?: string;
}

const { user, token } = AuthService.getAuthenticationInfo();
const initialState: AuthState = { loading: false, authUser: user, token };

export const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, loading: true, error: undefined };

    case AuthActionTypes.LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      return { ...state, loading: false, authUser: user, token };
    }

    case AuthActionTypes.LOGIN_ERROR: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }

    case AuthActionTypes.REGISTER:
      return { ...state, loading: true, error: undefined };

    case AuthActionTypes.REGISTER_SUCCESS: {
      const { user, token } = action.payload;
      return { ...state, loading: false, authUser: user, token };
    }

    case AuthActionTypes.REGISTER_ERROR: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }

    case AuthActionTypes.LOGOUT:
      AuthService.removeAuthenticationInfo();
      return { ...state, loading: false, error: undefined, authUser: undefined, token: undefined };

    default:
      return { ...state };
  }
};
