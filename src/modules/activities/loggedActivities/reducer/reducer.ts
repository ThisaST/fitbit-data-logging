import {
  ActivityState,
  LoggedActivityTypes,
  DeleteActivityState
} from "../types/types";
import { Reducer } from "redux";


export const initialState: ActivityState & DeleteActivityState = {
  activities: {
    activities: [],
    pagination: {
      beforeDate: "",
      limit: 5,
      next: "",
      offset: 0,
      previous: "",
      sort: "asc"
    }
  },
  activitiesLoading: false,
  activityErrors: undefined,

  deleteError: undefined,
  response: {}
};

const reducer: Reducer<ActivityState> = (state = initialState, action) => {
  switch (action.type) {
    case LoggedActivityTypes.GET_LOGGED_ACTIVITIES: {
      return { ...state, activitiesLoading: true };
    }
    case LoggedActivityTypes.GET_LOGGED_ACTIVITIES_SUCCESS: {
      return { ...state, activitiesLoading: false, activities: action.payload };
    }
    case LoggedActivityTypes.GET_LOGGED_ACTIVITIES_ERROR: {
      return {
        ...state,
        activitiesLoading: false,
        activityErrors: action.payload
      };
    }
    case LoggedActivityTypes.DELETE_LOGGED_ACTIVITY: {
      return { ...state, activitiesLoading: true };
    }
    case LoggedActivityTypes.DELETE_LOGGED_ACTIVITY_SUCCESS: {
      return { ...state, response: action.payload };
    }
    case LoggedActivityTypes.DELETE_LOGGED_ACTIVITY_ERROR: {
      return {
        ...state,
        deleteError: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as activityReducer };
