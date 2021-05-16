import React from "react";
import { Car } from "../entities/Car";

export const CarPartial = ({ car }: { car: Car }) => (
  <div className="car card">
    <h2>{(car.Model) ? car.Model.name : ""}</h2>
    {car && car.Model ? <img src={car.Model.photo}></img> : ""}
    <p>Локация: {car.Location ? car.Location.name : ""}</p>
  </div>
);
