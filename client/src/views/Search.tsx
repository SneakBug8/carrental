import React from "react";
import { Car } from "../entities/Car";
import { CarPartial } from "../partials/Car";
import { State } from "../State";
import { Requisite } from "../Requisite";
import { ErrorMessage } from "../partials/ErrorMessage";
import { CarCard } from "../partials/CarCard";
import { RouteComponentProps } from "react-router-dom";

export class SearchView extends React.Component<RouteComponentProps, { cars: Car[], error: Requisite }>
{
  constructor(props: RouteComponentProps)
  {
    super(props);
    this.state = {
      cars: new Array<Car>(),
      error: new Requisite(),
    };

    if (!State.searchModelId || !State.searchFrom || !State.searchTo) {
      this.props.history.push("../");
    }
  }

  componentDidMount()
  {
    State.SearchCars().then((response) =>
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
                  <h1><strong>Search</strong></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Car Search</strong></h2>
                <p className="mb-5">Ищем {State.searchModel ? `модель ${State.searchModel.name} ` : ""}
                  на срок от {State.searchFromString} до {State.searchToString}.</p>
                <ErrorMessage requisite={this.state.error} />
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
