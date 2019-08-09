import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import  history  from "./service/history";
import { activityReducer } from "./modules/activities/loggedActivities/reducer/reducer";
import { authenticationReducer } from "./modules/auth/reducers/reducer";

const rootReducer = combineReducers({
  auth : authenticationReducer,
  activity : activityReducer,
  router: connectRouter(history)
})

export default rootReducer