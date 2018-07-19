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
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {...state, user: action.payload, isAuth: true};
    case types.LOGIN_FAILED:
    case types.SIGNUP_FAILED:
      return {...state, error: action.payload, isAuth: false};
    default:
      return state;
  }
};