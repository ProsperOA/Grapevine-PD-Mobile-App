import firebase from 'firebase';
import { ActionCreator, Dispatch } from 'redux';

import * as types from './types';
import AuthCredentials from '../../models/auth-credentials.model';
import authTokenService from '../../shared/services/auth-token.service';

export interface IAuthUserSuccess {
  type: types.AUTH_USER_SUCCESS;
  payload: {
    user: firebase.User
  };
}

export interface IAuthUserFailed {
  type: types.AUTH_USER_FAILED;
  payload: string;
}
export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: {
    user: firebase.User;
  };
}

export interface ILoginFailed {
  type: types.LOGIN_FAILED;
  payload: string;
}

export interface ISignUpSuccess {
  type: types.SIGNUP_SUCCESS;
  payload: {
    user: firebase.User
  };
}

export interface ISignUpFailed {
  type: types.SIGNUP_FAILED;
  payload: string;
}

export type AuthAction =
  | IAuthUserSuccess
  | IAuthUserFailed
  | ILoginSuccess
  | ILoginFailed
  | ISignUpSuccess
  | ISignUpFailed;

const authUserSuccess: ActionCreator<IAuthUserSuccess> =
  (user: firebase.User): IAuthUserSuccess => ({
    type: types.AUTH_USER_SUCCESS,
    payload: { user }
});

const authUserFailed: ActionCreator<IAuthUserFailed> =
  (errMsg: string): IAuthUserFailed => ({
    type: types.AUTH_USER_FAILED,
    payload: errMsg
});

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: firebase.User): ILoginSuccess => ({
    type: types.LOGIN_SUCCESS,
    payload: { user }
});

const loginFailed: ActionCreator<ILoginFailed> =
  (errMsg: string): ILoginFailed => ({
    type: types.LOGIN_FAILED,
    payload: errMsg
});

const signUpSuccess: ActionCreator<ISignUpSuccess> =
  (user: firebase.User): ISignUpSuccess => ({
    type: types.SIGNUP_SUCCESS,
    payload: { user }
});

const signUpFailed: ActionCreator<ISignUpFailed> =
  (errMsg: string): ISignUpFailed => ({
    type: types.SIGNUP_FAILED,
    payload: errMsg
});

export const authUser = (token: string): any =>
  (dispatch: Dispatch<IAuthUserSuccess | IAuthUserFailed>): void => {
    firebase.auth().signInWithCustomToken(token)
      .then(({ user }: firebase.auth.UserCredential) => {
        dispatch(authUserSuccess(user));
      })
      .catch(({ message }: firebase.auth.Error) => {
        dispatch(authUserFailed(message));
      });
};

export const login = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ILoginSuccess | ILoginFailed>): void => {
    const { email, password } = credentials;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }: firebase.auth.UserCredential) => {
        user && user.getIdToken()
          .then(token => authTokenService.store(token))
          .catch(err => console.warn(err))

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
        user && user.getIdToken()
          .then(token => authTokenService.store(token))
          .catch(err => console.warn(err))

        dispatch(signUpSuccess(user));
      })
      .catch(({ message }: firebase.auth.Error) => {
        dispatch(signUpFailed(message));
      });
};