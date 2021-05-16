import React from "react";
import { Car } from "../entities/Car";

export const CarCard = ({ car }: {car: Car}) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="listing d-block  align-items-stretch">
      <div className="listing-img h-100 mr-4">
        <img src={(car.Model as any).photo} alt="Image" className="img-fluid" />
      </div>
      <div className="listing-contents h-100">
        <h3>{car.Model ? car.Model.name : ""} №{car.id}</h3>
        <div>
          <p>Местоположение: {car.Location ? car.Location.name : ""}</p>
          <p>{car.Model ? car.Model.description : ""}</p>
        </div>
      </div>
    </div>
  </div>);
