import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { LoggedActivityTypes } from "../types/types";
import { getDataFromFitbit, deleteData } from "../../../../api/api";
import {
  getLoggedActivitiesSuccess,
  deleteLoggedActivitySuccess
} from "../action/loggedActivityAction";
import { getAccessToken } from "../../../../util/localStorage";

function* getLoggedActivities(action: any) {
  try {
    const accessToken = getAccessToken();
    let url : string
    if(action.payload != null) {
      url = action.payload
      console.log(action)
    }
    else {
      url = "https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=2019-08-04&sort=desc&limit=5&offset=0"
    }
    const response = yield call(
      getDataFromFitbit,
      url,
      accessToken
    );

    yield put(getLoggedActivitiesSuccess(response));
  } catch (error) {}
}

function* deleteLoggedActivity(action: any) {
  try {
    console.log(action)
    const response = yield call(
      deleteData,
      "https://api.fitbit.com/1/user/-/activities/" +
        action.payload +
        ".json"
    );
    yield put(deleteLoggedActivitySuccess(response));
  } catch (error) {}
}

function* watchGetLoggedActivities() {
  yield takeEvery(
    LoggedActivityTypes.GET_LOGGED_ACTIVITIES,
    getLoggedActivities
  );
}

function* watchDeleteLoggedActivity() {
  yield takeEvery(
    LoggedActivityTypes.DELETE_LOGGED_ACTIVITY,
    deleteLoggedActivity
  );
}

function* activitySaga() {
  yield all([fork(watchGetLoggedActivities), fork(watchDeleteLoggedActivity)]);
}

export default activitySaga;
