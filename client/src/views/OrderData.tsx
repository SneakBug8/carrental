import React, { useState, useEffect } from "react";
import { Car } from "../entities/Car";
import { CarPartial } from "../partials/Car";
import { State } from "../State";
import { Requisite } from "../Requisite";
import { ErrorMessage } from "../partials/ErrorMessage";
import { CarCard } from "../partials/CarCard";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "react-context-hook";
import { Loader } from "../partials/Loader";
import { ShowIf } from "../partials/ShowIf";
import { API } from "../API";

export const OrderData = (props: RouteComponentProps) =>
{
  const [error, setError] = useState<Requisite<any>>(new Requisite());

  const [register, setRegister] = useState<number>(1);

  const [rentCar, setRentCar] = useStore("rentCar");
  const [rentCarId, setRentCarId] = useStore("rentCarId");

  const [carOrder, setCarOrder] = useStore("carOrder");

  const [searchModelId, setSearchModelId] = useStore("searchModelId", 0);
  const [searchModel, setSearchModel] = useStore("searchModel", null);
  const [searchFromString, setSearchFromString] = useStore("searchFromString", null);
  const [searchToString, setSearchToString] = useStore("searchToString", null);
  const [searchLocation, setSearchLocation] = useStore("searchLocation");

  const [searchFrom, setSearchFrom] = useStore("searchFrom", null);
  const [searchTo, setSearchTo] = useStore("searchTo", null);

  if (!carOrder) {
    props.history.push("../");
    return null;
  }

  return (
    <main>
      <div className="hero inner-page" style={{ backgroundImage: "url('images/hero_1_a.jpg')" }}>
        <div className="container">
          <div className="row align-items-end ">
            <div className="col-lg-5">
              <div className="intro">
                <h1><strong>Car Order info</strong></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ErrorMessage requisite={error} />
      <ShowIf show={rentCar && searchModel}>
        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Car rent</strong></h2>
                <p className="mb-5">You have booked car #{rentCar ? rentCar.id : ""} model {searchModel ? `${searchModel.name} ` : ""}
                  from {searchFromString} to {searchToString} in {searchLocation && searchLocation.name}.</p>
                <p className="mb-5">Your booking is confirmed with order number {carOrder.id}.</p>
                <a className="btn btn-secondary" href={"/print/order/" + carOrder.id}>Page for print</a>
              </div>
            </div>
          </div>
        </div>
        </ShowIf>
    </main>
      );
    }
