import React from "react";
import { Car } from "../../../entities/Car";

export class AdminCarPartial extends React.Component<{ car: Car }>
{
  render()
  {
    return (
      <div className="car card">
        <h2>{this.props.car.ModelName}</h2>
        {this.props.car && this.props.car.Model ? <img src={this.props.car.Model.Photo}></img> : ""}
        <p>Локация: {this.props.car.LocationName}</p>
      </div>
    );
  }
}