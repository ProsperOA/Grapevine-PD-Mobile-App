import * as types from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user: any;
  error: string;
}

const initialState: Readonly<AuthState> = {
  user: null,
  error: ''
}

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {...state, user: action.payload};
    case types.LOGIN_FAILED:
    case types.SIGNUP_FAILED:
      return {...state, error: action.payload};
    default:
      return state;
  }
};