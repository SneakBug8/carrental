import React from "react";
import { API } from "../../../API";
import { Car } from "../../../entities/Car";
import { AdminCarPartial } from "../partials/AdminCar";

export class AdminCars extends React.Component<{}, {cars: Car[], error: string}>
{
  constructor(props: {})
  {
    super(props);
    this.state = {
      cars: new Array<Car>(),
      error: "",
    };
  }

  componentDidMount() {
    API.GetCarsPopulate().then((response) => {
      console.log(response.data);
      this.setState({
        cars: response.data as Car[],
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
            {this.state.error.length ? (<div className="alert alert-danger">{this.state.error}</div>) : ""}
            {!this.state.cars.length ? (<p>Нет доступных автомобилей.</p>) : ""}
            {this.state.cars.map((car) => (<AdminCarPartial car={car}/>))}
          </div>
    );
  }
}
