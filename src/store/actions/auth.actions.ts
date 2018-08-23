import { AxiosResponse, AxiosError } from 'axios';
import { ActionCreator, Dispatch } from 'redux';

import * as types from './types';
import axios from '../../shared/axios';
import AuthCredentials from '../../models/auth-credentials.model';
import authTokenService from '../../shared/services/auth-token.service';

export interface IAuthUserSuccess {
  type: types.AUTH_USER_SUCCESS;
  payload: {
    user: any;
  };
}

export interface IAuthUserFailed {
  type: types.AUTH_USER_FAILED;
  payload: string;
}
export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: any;
}

export interface ILoginFailed {
  type: types.LOGIN_FAILED;
  payload: string;
}

export type AuthAction =
  | IAuthUserSuccess
  | IAuthUserFailed
  | ILoginSuccess
  | ILoginFailed;

const authUserSuccess: ActionCreator<IAuthUserSuccess> =
  (user: any): IAuthUserSuccess => ({
    type: types.AUTH_USER_SUCCESS,
    payload: { user }
});

const authUserFailed: ActionCreator<IAuthUserFailed> =
  (errMsg: string): IAuthUserFailed => ({
    type: types.AUTH_USER_FAILED,
    payload: errMsg
});

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: any): ILoginSuccess => ({
    type: types.LOGIN_SUCCESS,
    payload: user
});

const loginFailed: ActionCreator<ILoginFailed> =
  (errMsg: string): ILoginFailed => ({
    type: types.LOGIN_FAILED,
    payload: errMsg
});

export const authUser = (userID: string): any =>
  (dispatch: Dispatch<IAuthUserSuccess | IAuthUserFailed>): void => {
    axios.post(`users/${userID}/auth`)
      .then(({ data }: AxiosResponse) => dispatch(authUserSuccess(data.data)))
      .catch(() => dispatch(authUserFailed()));
};

export const login = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ILoginSuccess | ILoginFailed>): void => {
    const { email, password } = credentials;
    const data = {
      email,
      password,
      auth_type: 'regular'
    };

    axios.post('/login', data)
      .then(({ data }: AxiosResponse) => {
        const { auth_token, user } = data.data;
        authTokenService.store(`${user.id}-${auth_token}`);

        dispatch(loginSuccess(user));
      })
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to login';
        dispatch(loginFailed(error));
      });
  };