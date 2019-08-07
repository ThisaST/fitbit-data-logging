import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, fork } from 'redux-saga/effects'
import rootReducer from './reducers'
import { Store, createStore, applyMiddleware } from 'redux';
import { ActivityState, DeleteActivityState } from './modules/activities/loggedActivities/types/types';
import activitySaga from './modules/activities/loggedActivities/sagas/saga';
import createSagaMiddleware from '@redux-saga/core';

export interface ApplicationState {
  activity : ActivityState,
  deleteActivity : DeleteActivityState
}

export function* rootSaga() {
  yield all([fork(activitySaga)])
}

export function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
  
  const sagaMiddleware = createSagaMiddleware()
  let middleware = applyMiddleware(sagaMiddleware);
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    ApplicationState
  >;
  sagaMiddleware.run(rootSaga)
  return store;
}

export const history = createHistory()