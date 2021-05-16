import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import { CarsList, CarEdit, CarCreate, PostIcon } from "./resources/Cars";
import { CarModelsList, CarModelEdit, CarModelCreate } from "./resources/CarModels";
import { LocationsList, LocationEdit, LocationCreate } from "./resources/Locations";
import { CarOrdersList, CarOrdersEdit, CarOrdersCreate } from "./resources/CarOrders";
import { UsersList, UsersEdit, UsersCreate } from "./resources/Users";

ReactDOM.render(
  (<React.StrictMode>
    <Admin dataProvider={restProvider("/api")}>
      <Resource name="cars" list={CarsList} edit={CarEdit} create={CarCreate} icon={PostIcon} />
      <Resource name="models" list={CarModelsList} edit={CarModelEdit} create={CarModelCreate} icon={PostIcon} />
      <Resource name="locations" list={LocationsList} edit={LocationEdit} create={LocationCreate} icon={PostIcon} />
      <Resource name="orders" list={CarOrdersList} edit={CarOrdersEdit} create={CarOrdersCreate} icon={PostIcon}/>
      <Resource name="users" list={UsersList} edit={UsersEdit} create={UsersCreate} icon={PostIcon}/>

    </Admin>
  </React.StrictMode>),
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
