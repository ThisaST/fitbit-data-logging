import { action } from "typesafe-actions";
import { LoggedActivityTypes, Activity } from "../types/types";

export const getLoggedActivities = (url? : string) =>
  action(LoggedActivityTypes.GET_LOGGED_ACTIVITIES, url);
export const getLoggedActivitiesSuccess = (activities: Activity[]) =>
  action(LoggedActivityTypes.GET_LOGGED_ACTIVITIES_SUCCESS, activities);
export const getLoggedActivitiesError = (message: string) =>
  action(LoggedActivityTypes.GET_LOGGED_ACTIVITIES_ERROR, message);

export const deleteLoggedActivity = (logId: number) =>
  action(LoggedActivityTypes.DELETE_LOGGED_ACTIVITY, logId);
export const deleteLoggedActivitySuccess = (response: any) =>
  action(LoggedActivityTypes.DELETE_LOGGED_ACTIVITY_SUCCESS, response);
export const deleteLoggedActivityError = (message: string) =>
  action(LoggedActivityTypes.DELETE_LOGGED_ACTIVITY_ERROR, message);
