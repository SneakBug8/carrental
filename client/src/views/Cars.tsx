import React from "react";
import { Car } from "../entities/Car";
import { CarPartial } from "../partials/Car";
import { State } from "../State";
import { Requisite } from "../Requisite";
import { ErrorMessage } from "../partials/ErrorMessage";

export class CarsView extends React.Component<{}, {cars: Car[], error: Requisite}>
{
  constructor(props: {})
  {
    super(props);
    this.state = {
      cars: new Array<Car>(),
      error: new Requisite(),
    };
  }

  componentWillMount() {
    State.GetCars().then((response) => {
      console.log(response.data);
      this.setState({
        cars: response.data || new Array<Car>(),
      });
    })
    .catch((response) => {
      this.setState({
        error: response,
      });
    });
  }

  render()
  {
    return (
      <div>
        <ErrorMessage requisite={this.state.error}/>
            {!this.state.cars.length ? (<p>Нет доступных автомобилей.</p>) : ""}
            {this.state.cars.map((car) => (<CarPartial key={car.Id} car={car}/>))}
          </div>
    );
  }
}
