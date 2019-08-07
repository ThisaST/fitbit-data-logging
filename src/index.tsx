import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import {configureStore, history} from "./configureStore";
import {ConnectedRouter} from "connected-react-router";
import 'bootstrap/dist/css/bootstrap.css';
import Routes from "./routes";

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes/>
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
