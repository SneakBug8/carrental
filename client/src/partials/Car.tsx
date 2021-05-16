import React from "react";
import { Car } from "../entities/Car";

export class CarPartial extends React.Component<{ car: Car }>
{
  render()
  {
    return (
      <div className="car card">
        <h2>{(this.props.car.Model) ? this.props.car.Model.name : ""}</h2>
        {this.props.car && this.props.car.Model ? <img src={this.props.car.Model.photo}></img> : ""}
        <p>Локация: {this.props.car.Location ? this.props.car.Location.name : ""}</p>
      </div>
    );
  }
}