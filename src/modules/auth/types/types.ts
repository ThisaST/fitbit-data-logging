export interface AccessToken {
  accessToken: string
  refreshToken : string
  userId : string
}

export enum AuthActionTypes {
  GET_AUTHENTICATION_CODE = '@@auth/GET_AUTHENTICATION_CODE',
  GET_AUTHENTICATION_CODE_SUCCESS = '@@auth/GET_AUTHENTICATION_CODE_SUCCESS',
  GET_AUTHENTICATION_CODE_ERROR = '@@auth/GET_AUTHENTICATION_CODE_ERROR',

  GET_ACCESS_TOKEN = '@@accessToken/GET_ACCESS_TOKEN',
  GET_ACCESS_TOKEN_SUCCESS = '@@accessToken/GET_ACCESS_TOKEN_SUCCESS',
  GET_ACCESS_TOKEN_ERROR = '@@accessToken/GET_ACCESS_TOKEN_ERROR'
}

export interface AuthState {
  readonly isAuthenticated : boolean
  readonly authCode : string
  readonly authCodeError? : string
  readonly accessToken : AccessToken
  readonly accessTokenLoading : boolean
  readonly accessTokenError? : string
}