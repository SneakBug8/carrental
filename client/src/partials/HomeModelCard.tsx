import React from "react";
import { CarModel } from "../entities/CarModel";

export const HomeModelCard = ({ model }: { model: CarModel }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="listing d-block  align-items-stretch">
      <div className="listing-img h-100 mr-4">
        <img src={model.photo} alt="Image" className="img-fluid" />
      </div>
      <div className="listing-contents h-100">
        <h3>{model.name}</h3>
        <div>
          <p>{model.description}</p>
        </div>
      </div>
    </div>
  </div>
);