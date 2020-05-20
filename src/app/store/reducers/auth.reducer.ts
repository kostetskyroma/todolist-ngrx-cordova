import { AuthActions, AUTH_TYPE } from '../actions/auth.actions';
import { User } from '../../core/interfaces/user';

export const authNode = 'auth';

export interface AuthState {
  authenticated: boolean;
  error?: string;
  loaded: boolean;
  loading: boolean;
  user?: User;
}

export const initialState: AuthState = {
  authenticated: false,
  loaded: false,
  loading: false,
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_TYPE.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTH_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        loaded: true,
        user: action.payload,
      };
    case AUTH_TYPE.LOGIN_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};
