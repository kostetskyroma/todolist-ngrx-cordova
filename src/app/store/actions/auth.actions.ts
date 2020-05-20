import { Action } from '@ngrx/store';
import { Login } from '../../login/login.interface';

export enum AUTH_TYPE {
  LOGIN = '[AUTH] login',
  LOGIN_SUCCESS = '[AUTH] login success',
  LOGIN_ERROR = '[AUTH] login error',
  SIGN_UP = '[AUTH] sign-up',
  SIGN_UP_SUCCESS = '[AUTH] sign-up success',
  SIGN_UP_ERROR = '[AUTH] sign-up error',
}

export class LoginAction implements Action {
  readonly type = AUTH_TYPE.LOGIN;
  constructor(public payload: Login) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AUTH_TYPE.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginErrorAction implements Action {
  readonly type = AUTH_TYPE.LOGIN_ERROR;
  constructor(public payload: any) {}
}

export class SignUpAction implements Action {
  readonly type = AUTH_TYPE.SIGN_UP;
  constructor(public payload: any) {}
}

export class SignUpSuccessAction implements Action {
  readonly type = AUTH_TYPE.SIGN_UP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpErrorAction implements Action {
  readonly type = AUTH_TYPE.SIGN_UP_ERROR;
  constructor(public payload: any) {}
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpErrorAction;
