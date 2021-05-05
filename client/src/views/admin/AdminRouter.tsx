import React from 'react';
import { BrowserRouter as Router, Route, useRouteMatch, withRouter, Switch } from "react-router-dom";
import { Admin } from "./Admin";
import { AdminHome } from "./views/AdminHome";
import { AdminCars } from "./views/AdminCars";
import { AdminLocations } from "./views/AdminLocations";

export class AdminRouterClass extends React.Component<any>
{
  render()
  {
    const { path, url } = this.props.match;

    return (
      <Admin>
        <Switch>
          <Route path={`${path}/cars`} component={AdminCars} />
          <Route path={`${path}/locations`} component={AdminLocations} />
          <Route path={`${path}`} component={AdminHome} />
        </Switch>
      </Admin>
    );
  }
}

export const AdminRouter = withRouter(AdminRouterClass);