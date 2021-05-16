import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./views/Home";
import { CarsView } from "./views/Cars";
import { SearchView } from "./views/Search";

export class MyRouterClass extends React.Component<any>
{
  render()
  {
    return (
      <Router>
        <Switch>
          <Route path="/cars" render={routeProps => <CarsView {...this.props} {...routeProps} />} />
          <Route path="/search" render={routeProps => <SearchView {...this.props} {...routeProps} />} />
          <Route render={routeProps => <Home {...this.props} {...routeProps} />} />
        </Switch>
      </Router>
    );
  }
}

export const MyRouter = MyRouterClass;
