import { AuthState, AuthActionTypes } from "../types/types";
import { Reducer } from "redux";

export const initialState: AuthState = {
  accessToken: { accessToken: "", refreshToken: "", userId: "" },
  accessTokenError: undefined,
  accessTokenLoading: false,
  authCode: "",
  authCodeError: undefined,
  isAuthenticated: false
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.GET_AUTHENTICATION_CODE: {
      return { ...state, activitiesLoading: true, authCode: action.payload };
    }
    case AuthActionTypes.GET_AUTHENTICATION_CODE_SUCCESS: {
      return { ...state };
    }
    case AuthActionTypes.GET_AUTHENTICATION_CODE_ERROR: {
      return {
        ...state,
        activitiesLoading: false,
        authCodeError: action.payload
      };
    }
    case AuthActionTypes.GET_ACCESS_TOKEN: {
      return { ...state, accessTokenLoading: true };
    }
    case AuthActionTypes.GET_ACCESS_TOKEN_SUCCESS: {
      return {
        ...state,
        accessTokenLoading: false,
        accessToken: action.payload,
        isAuthenticated: true
      };
    }
    case AuthActionTypes.GET_ACCESS_TOKEN_ERROR: {
      return {
        ...state,
        accessTokenLoading: false,
        accessTokenError: action.payload,
        isAuthenticated: false
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as authenticationReducer };
