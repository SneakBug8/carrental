import React from 'react';
import { BrowserRouter as Router, Route, useRouteMatch, withRouter, Switch } from "react-router-dom";
import { Admin } from "./Admin";
import { AdminHome } from "./views/AdminHome";

export class AdminRouterClass extends React.Component<any>
{
  render()
  {
    const { path, url } = this.props.match;

    return (
      <Router>
        <Admin>
          <Switch>
            <Route path={`${path}`} component={AdminHome} />
          </Switch>
        </Admin>
      </Router>
    );
  }
}

export const AdminRouter = withRouter(AdminRouterClass);