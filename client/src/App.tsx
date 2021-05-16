import React from "react";
import { Sidebar } from "./partials/Sidebar";
import { Navbar } from "./partials/Navbar";
import { Route, BrowserRouter as Router } from "react-router-dom";

export class App extends React.Component
{
  public render()
  {
    return (
      <div>{this.props.children}</div>
    );
  }
}