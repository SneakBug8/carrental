import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./views/Home";
import { CarsView } from "./views/Cars";
import { SearchView } from "./views/Search";
import { RentView } from "./views/Rent";
import { OrderData } from "./views/OrderData";

export const MyRouter = (props: any) =>
  (
    <Router>
      <Switch>
        <Route path="/cars" render={routeProps => <CarsView {...props} {...routeProps} />} />
        <Route path="/search" render={routeProps => <SearchView {...props} {...routeProps} />} />
        <Route path="/rent" render={routeProps => <RentView {...props} {...routeProps} />} />
        <Route path="/order" render={routeProps => <OrderData {...props} {...routeProps} />} />
        <Route render={routeProps => <Home {...props} {...routeProps} />} />
      </Switch>
    </Router>
  );
