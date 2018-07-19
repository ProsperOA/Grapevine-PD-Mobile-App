import firebase from 'firebase';
import { ActionCreator, Dispatch } from 'redux';

import * as types from './types';
import AuthCredentials from '../../models/auth-credentials.model';

export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: {
    user: firebase.auth.UserCredential;
  };
}

export interface ILoginFailed {
  type: types.LOGIN_FAILED;
  payload: string;
}

export interface ISignUpSuccess {
  type: types.SIGNUP_SUCCESS;
  payload: {
    user: firebase.auth.UserCredential;
  };
}

export interface ISignUpFailed {
  type: types.SIGNUP_FAILED;
  payload: string;
}

export type AuthAction =
  | ILoginSuccess
  | ILoginFailed
  | ISignUpSuccess
  | ISignUpFailed;

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: any): ILoginSuccess => ({
    type: types.LOGIN_SUCCESS,
    payload: { user }
  });

const loginFailed: ActionCreator<ILoginFailed> =
  (errMsg: string): ILoginFailed => ({
    type: types.LOGIN_FAILED,
    payload: errMsg
  });

const signUpSuccess: ActionCreator<ISignUpSuccess> =
  (user: any): ISignUpSuccess => ({
    type: types.SIGNUP_SUCCESS,
    payload: { user }
  });

const signUpFailed: ActionCreator<ISignUpFailed> =
  (errMsg: string): ISignUpFailed => ({
    type: types.SIGNUP_FAILED,
    payload: errMsg
  });


export const login = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ILoginSuccess | ILoginFailed>): void => {
    const { email, password } = credentials;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }: firebase.auth.UserCredential) => {
        dispatch(loginSuccess(user));
      })
      .catch(({ message }: firebase.auth.Error) => {
        dispatch(loginFailed(message));
      });
  };

export const signUp = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ISignUpSuccess | ISignUpFailed>): void => {
    const { email, password } = credentials;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }: firebase.auth.UserCredential) => {
        dispatch(signUpSuccess(user));
      })
      .catch(({ message }: firebase.auth.Error) => {
        dispatch(signUpFailed(message));
      });
};