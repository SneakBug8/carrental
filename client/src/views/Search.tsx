import React, { useState, useEffect } from "react";
import { Car } from "../entities/Car";
import { CarPartial } from "../partials/Car";
import { State } from "../State";
import { Requisite } from "../Requisite";
import { ErrorMessage } from "../partials/ErrorMessage";
import { CarCard } from "../partials/CarCard";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "react-context-hook";

export const SearchView = (props: RouteComponentProps) =>
{
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<Requisite>(new Requisite());

  const [searchModelId, setSearchModelId] = useStore("searchModelId", 0);
  const [searchModel, setSearchModel] = useStore("searchModel", null);
  const [searchFromString, setSearchFromString] = useStore("searchFromString", null);
  const [searchToString, setSearchToString] = useStore("searchToString", null);

  useEffect(() =>
  {
    if (!searchModelId) {
      props.history.push("../");
    }
    console.log(props.location.search);

    State.SearchCars().then((response) =>
    {
      setCars(response.data || new Array<Car>());
    })
      .catch((response) =>
      {
        setError(response);
      });
  }, []);

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
              <p className="mb-5">Ищем {searchModel ? `модель ${searchModel.name} ` : ""}
                на срок от {searchFromString} до {searchToString}.</p>
              <ErrorMessage requisite={error} />
            </div>
          </div>
          <div className="row">
            {cars.map(e => <CarCard car={e} key={e.id} />)}
          </div>
        </div>
      </div>
    </main >
  );
}
