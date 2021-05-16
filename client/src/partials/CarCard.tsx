import React from "react";
import { Car } from "../entities/Car";

export class CarCard extends React.Component<{ car: Car }>
{
  render()
  {
    return (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="listing d-block  align-items-stretch">
          <div className="listing-img h-100 mr-4">
            <img src={(this.props.car.Model as any).photo} alt="Image" className="img-fluid" />
          </div>
          <div className="listing-contents h-100">
            <h3>{this.props.car.Model ? this.props.car.Model.name : ""} №{this.props.car.id}</h3>
            <div>
              <p>Местоположение: {this.props.car.Location ? this.props.car.Location.name : ""}</p>
              <p>{this.props.car.Model ? this.props.car.Model.description : ""}</p>
            </div>
          </div>
        </div>
      </div>);
  }
}