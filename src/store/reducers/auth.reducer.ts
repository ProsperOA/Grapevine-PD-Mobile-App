import * as types from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user: any;
}

const initialState: Readonly<AuthState> = {
  user: null,
}

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {...state, user: action.payload};
    case types.LOGIN_FAILED:
    default:
      return state;
  }
};