import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import  history  from "./service/history";
import { activityReducer } from "./modules/activities/loggedActivities/reducer/reducer";

const rootReducer = combineReducers({
  activity : activityReducer,
  router: connectRouter(history)
})

export default rootReducer