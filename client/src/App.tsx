import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { withStore } from "react-context-hook";
import { MyRouter } from "./MyRouter";

const THE_STORE = "THE_STORE";

function persistOnChange(store: any)
{
  localStorage.setItem(THE_STORE, JSON.stringify(store));
}

const storeConfig = {
  listener: persistOnChange,
  logging: true,
};

const initialState = JSON.parse(/*localStorage.getItem(THE_STORE) || */ "{}") || {
  models: [],
  cars: [],
};

export const App = withStore(MyRouter, initialState, storeConfig);
