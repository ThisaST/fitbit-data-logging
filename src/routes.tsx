import React from "react";
import { Route, Switch } from "react-router";

import LoggedActivities from "./modules/activities/loggedActivities/component/loggedActivities";
import App from "./App";
import Main from "./main";

export const foo = "foo";

const Routes: React.FC = () => (
  <>
    <Main/>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/activities" component={LoggedActivities} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </>
);

export default Routes;
