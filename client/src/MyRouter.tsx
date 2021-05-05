import React from 'react';
import { BrowserRouter as Router, Route, useRouteMatch, withRouter, Switch } from "react-router-dom";

import { App } from "./App";
import { Home } from "./views/Home";
import { CarsView } from "./views/Cars";
import { AdminRouter } from "./views/admin/AdminRouter";

export class MyRouterClass extends React.Component<any>
{
  render()
  {
    return (
      <Router>
        <Switch>
          <Route path={`/admin`} component={AdminRouter} />
          <Route path="/">
            <App>
              <Switch>
                <Route path="/cars" component={CarsView} />
                <Route component={Home} />
              </Switch>
            </App>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export const MyRouter = MyRouterClass;
