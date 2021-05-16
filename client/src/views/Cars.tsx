import React from "react";
import { Car } from "../entities/Car";
import { CarPartial } from "../partials/Car";
import { State } from "../State";
import { Requisite } from "../Requisite";
import { ErrorMessage } from "../partials/ErrorMessage";
import { CarCard } from "../partials/CarCard";

export class CarsView extends React.Component<{}, { cars: Car[], error: Requisite }>
{
  constructor(props: {})
  {
    super(props);
    this.state = {
      cars: new Array<Car>(),
      error: new Requisite(),
    };
  }

  componentDidMount()
  {
    State.GetCars().then((response) =>
    {
      console.log(response.data);
      this.setState({
        cars: response.data || new Array<Car>(),
      });
    })
      .catch((response) =>
      {
        this.setState({
          error: response,
        });
      });
  }

  render()
  {
    return (
      <main>
        <div className="hero inner-page" style={{ backgroundImage: "url('images/hero_1_a.jpg')" }}>
        <div className="container">
          <div className="row align-items-end ">
            <div className="col-lg-5">
              <div className="intro">
                <h1><strong>Listings</strong></h1>
              </div>
            </div>
          </div>
        </div>
        </div>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong>Car Listings</strong></h2>
              <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="row">
            {this.state.cars.map(e => <CarCard car={e} key={e.id} />)}
          </div>
        </div>
      </div>
      </main >
    );
  }
}
