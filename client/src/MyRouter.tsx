import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./views/Home";
import { CarsView } from "./views/Cars";
import { SearchView } from "./views/Search";

export const MyRouter = (props: any) =>
  (
    <Router>
      <Switch>
        <Route path="/cars" render={routeProps => <CarsView {...props} {...routeProps} />} />
        <Route path="/search" render={routeProps => <SearchView {...props} {...routeProps} />} />
        <Route render={routeProps => <Home {...props} {...routeProps} />} />
      </Switch>
    </Router>
  );
