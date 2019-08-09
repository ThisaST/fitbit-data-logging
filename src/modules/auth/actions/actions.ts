import { action } from "typesafe-actions";
import { AuthActionTypes } from "../types/types";

export const getAuthenticationCode = (token : string) =>
  action(AuthActionTypes.GET_AUTHENTICATION_CODE, token);
export const getAuthenticationCodeSuccess = (authCode: string) =>
  action(AuthActionTypes.GET_AUTHENTICATION_CODE_SUCCESS, authCode);
export const getAuthenticationCodeError = (message: string) =>
  action(AuthActionTypes.GET_AUTHENTICATION_CODE_ERROR, message);

export const getAccessToken = (data: any) =>
  action(AuthActionTypes.GET_ACCESS_TOKEN, data);
export const getAccessTokenSuccess = (accessToken: any) =>
  action(AuthActionTypes.GET_ACCESS_TOKEN_SUCCESS, accessToken);
export const getAccessTokenError = (message: string) =>
  action(AuthActionTypes.GET_ACCESS_TOKEN_ERROR, message);
