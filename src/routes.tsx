import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import LoggedActivities from "./modules/activities/loggedActivities/component/loggedActivities";
import App from "./App";
import LoginView from "./modules/auth/components/loginView";
import history from "./service/history";
export const foo = "foo";

const Routes: React.FC = () => (
  <>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path="/home" component={App} />
        <Route path="/activities" component={LoggedActivities} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
  </>
);

export default Routes;
