import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { AuthActionTypes } from "../types/types";
import { getDataFromFitbit, fetchData } from "../../../api/api";
import { getAccessTokenSuccess, getAuthenticationCodeSuccess } from "../actions/actions";

function* getAuthAccessToken(action: any) {
  try {
    console.log(action)
    const url = action.payload.url;
    const response = yield call(fetchData, url, "POST", action.payload.authCode);
    yield put(getAccessTokenSuccess(response));
  } catch (error) {}
}

function* getAuthenticationCode(action : any) {
  try {
    console.log(action)
    yield put(getAuthenticationCodeSuccess(action.payload))
  } catch (error) {
    
  }
}

function* watchGetAccessToken() {
  yield takeEvery(AuthActionTypes.GET_ACCESS_TOKEN, getAuthAccessToken);
}

function* watchGetAuthenticationCode() {
  yield takeEvery(AuthActionTypes.GET_AUTHENTICATION_CODE, getAuthenticationCode)
}

function* authSaga() {
  yield all([fork(watchGetAccessToken), fork(watchGetAuthenticationCode)]);
}

export default authSaga;
