
export interface Activity {
  activityName : string
  activityTypeId : number
  logId : number
  logType : string
  activeDuration : number
  duration : number
  lastModified : string
  calories : number
  distance : number
}

export interface Pagination {
  beforeDate : string
  limit : number
  next: string
  offset : number
  previous : string
  sort: string
}

export interface ActivityState {
  readonly activitiesLoading : boolean
  readonly activities : {activities : Activity[], pagination: Pagination}
  readonly activityErrors? : string
}

export interface DeleteActivityState {
  readonly response : any
  readonly deleteError? : string
}
export enum LoggedActivityTypes {
  GET_LOGGED_ACTIVITIES = "@@activities/GET_LOGGED_ACTIVITIES",
  GET_LOGGED_ACTIVITIES_SUCCESS = "@@activities/GET_LOGGED_ACTIVITIES_SUCCESS",
  GET_LOGGED_ACTIVITIES_ERROR = "@@activities/GET_LOGGED_ACTIVITIES_ERROR",

  DELETE_LOGGED_ACTIVITY = '@@activities/DELETE_LOGGED_ACTIVITY',
  DELETE_LOGGED_ACTIVITY_SUCCESS = '@@activities/DELETE_LOGGED_ACTIVITY_SUCCESS',
  DELETE_LOGGED_ACTIVITY_ERROR = '@@activities/DELETE_LOGGED_ACTIVITY_ERROR'
}
