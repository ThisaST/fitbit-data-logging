import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers'
import { Store, createStore, applyMiddleware } from 'redux';

interface ApplicationState {

}

export function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
  let middleware = applyMiddleware();

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    ApplicationState
  >;

  return store;
}

export const history = createHistory()