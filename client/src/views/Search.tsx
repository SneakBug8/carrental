import React, { useState, useEffect } from "react";
import { Car } from "../entities/Car";
import { State } from "../State";
import { Requisite } from "../Requisite";
import { ErrorMessage } from "../partials/ErrorMessage";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "react-context-hook";
import { Loader } from "../partials/Loader";
import { RentCarCard } from "../partials/RentCarCard";
import { ShowIf } from "../partials/ShowIf";

export const SearchView = (props: RouteComponentProps) =>
{
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<Requisite>(new Requisite());

  const [loaded, setLoaded] = useState<boolean>(false);

  const [searchLocationId, setSearchLocationId] = useStore("searchLocationId", 0);
  const [searchLocation, setSearchLocation] = useStore("searchLocation");
  const [searchFromString, setSearchFromString] = useStore("searchFromString", null);
  const [searchToString, setSearchToString] = useStore("searchToString", null);

  if (!searchLocationId) {
    props.history.push("../");
  }

  useEffect(() =>
  {
    State.SearchCars().then((response) =>
    {
      setCars(response.data || new Array<Car>());
      setLoaded(true);
    })
      .catch((response) =>
      {
        setError(response);
        setLoaded(true);
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
        <Loader show={!loaded} />
        <ShowIf show={loaded && searchLocation}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Car Search</strong></h2>
                <p className="mb-5">Searching a car in {searchLocation && searchLocation.name} from {searchFromString} to {searchToString} in .</p>
                <ErrorMessage requisite={error} />
              </div>
            </div>
            <div className="row">
              {cars.map(e => <RentCarCard car={e} key={e.id} {...props} />)}
            </div>
          </div>
        </ShowIf>
      </div>
    </main >
  );
}
