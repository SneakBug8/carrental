import React from "react";
import { Sidebar } from "./partials/Sidebar";
import { Navbar } from "./partials/Navbar";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AdminRouter } from "./views/admin/AdminRouter";

export class App extends React.Component
{
  public render()
  {
    return (
      <div className="container App">
        <Navbar />
        <div className="mt-1 row">
          <div className="col-sm-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-sm-12 col-md-9">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}