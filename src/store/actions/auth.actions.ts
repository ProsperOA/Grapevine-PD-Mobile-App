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

export interface ISignUpSuccess {
  type: types.SIGNUP_SUCCESS;
  payload: {
    user: any;
  };
}

export interface ISignUpFailed {
  type: types.SIGNUP_FAILED;
}

export type AuthAction =
  | ILoginSuccess
  | ILoginFailed
  | ISignUpSuccess
  | ISignUpFailed;

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: any): ILoginSuccess => ({
    type:    types.LOGIN_SUCCESS,
    payload: { user }
});

const loginFailed: ActionCreator<ILoginFailed> =
  (): ILoginFailed => ({
    type: types.LOGIN_FAILED
});

const signUpSuccess: ActionCreator<ISignUpSuccess> =
  (user: any): ISignUpSuccess => ({
    type:    types.SIGNUP_SUCCESS,
    payload: { user }
});

const signUpFailed: ActionCreator<ISignUpFailed> =
  (): ISignUpFailed => ({
    type: types.SIGNUP_FAILED
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

export const signUp = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ISignUpSuccess | ISignUpFailed>): void => {
    const { email, password } = credentials;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res: firebase.auth.UserCredential) => {
        dispatch(signUpSuccess(res.user));
      })
      .catch(err => {
        dispatch(signUpFailed());
        console.error(err);
      });
};