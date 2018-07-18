import * as firebase from 'firebase';
import { ActionCreator, Dispatch } from 'redux';

import * as types from './types';
import AuthCredentials from '../../models/auth-credentials.model';

export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: {
    user: any;
  };
}

export interface ILoginFailed {
  type: types.LOGIN_FAILED;
}

export type AuthAction =
  | ILoginSuccess
  | ILoginFailed;

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: any): ILoginSuccess => ({
    type:    types.LOGIN_SUCCESS,
    payload: { user }
});

const loginFailed: ActionCreator<ILoginFailed> =
  (): ILoginFailed => ({
    type: types.LOGIN_FAILED
});

export const login = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ILoginSuccess | ILoginFailed>): void => {
    const { email, password } = credentials;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res: firebase.auth.UserCredential) => {
        dispatch(loginSuccess(res.user));
      })
      .catch(err => {
        dispatch(loginFailed());
        console.error(err);
      });
};