import * as types from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user: any;
  isAuth: boolean;
  error: string;
}

const initialState: Readonly<AuthState> = {
  user: null,
  isAuth: false,
  error: ''
}

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.AUTH_USER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {...state, user: action.payload, isAuth: true};
    case types.LOGIN_FAILED:
      return {...state, error: action.payload, isAuth: false};
    case types.AUTH_USER_FAILED:
    default:
      return state;
  }
};