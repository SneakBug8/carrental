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
import { jquery } from "..";
import { ShowIf } from "../partials/ShowIf";
import { API } from "../API";

export const RentView = (props: RouteComponentProps) =>
{
  const [error, setError] = useState<Requisite<any>>(new Requisite());
  const [loaded, setLoaded] = useState<boolean>(false);

  const [register, setRegister] = useState<number>(1);

  const [rentCar, setRentCar] = useStore("rentCar");
  const [rentCarId, setRentCarId] = useStore("rentCarId");

  const [carOrder, setCarOrder] = useStore("carOrder");

  const [searchModelId, setSearchModelId] = useStore("searchModelId", 0);
  const [searchModel, setSearchModel] = useStore("searchModel", null);
  const [searchFromString, setSearchFromString] = useStore("searchFromString", null);
  const [searchToString, setSearchToString] = useStore("searchToString", null);

  const [searchFrom, setSearchFrom] = useStore("searchFrom", null);
  const [searchTo, setSearchTo] = useStore("searchTo", null);

  if (!rentCarId) {
    props.history.push("../");
  }

  useEffect(() =>
  {
    State.RentCar().then((response) =>
    {
      setLoaded(true);
    })
      .catch((response) =>
      {
        setError(response);
        setLoaded(true);
      });
  }, []);

  function registerChange(event: React.FormEvent)
  {
    setRegister((event.target as any).value);
  }

  async function handleSubmit(event: React.FormEvent)
  {
    event.preventDefault();

    const login = jquery("#cf-2").val();
    const password = jquery("#cf-3").val();
    const phone = jquery("#cf-4").val();
    const email = jquery("#cf-5").val();

    if (register === 2) {
      const r = await API.Register(login, password, phone, email);
    }

    const r2 = await API.Rent(login, password, rentCarId, searchFrom, searchTo);

    console.log(r2);

    if (!r2.result) {
      console.log(r2);
      setError(r2);
      return;
    }

    setCarOrder(r2.data);

    props.history.push("/order");
  }

  return (
    <main>
      <div className="hero inner-page" style={{ backgroundImage: "url('images/hero_1_a.jpg')" }}>
        <div className="container">
          <div className="row align-items-end ">
            <div className="col-lg-5">
              <div className="intro">
                <h1><strong>Rent car</strong></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader show={!loaded} />
      <ErrorMessage requisite={error} />
      <ShowIf show={loaded && rentCar && searchModel}>
        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Car rent</strong></h2>
                <p className="mb-5">Заказываем авто {rentCar ? rentCar.id : ""} модели {searchModel ? `${searchModel.name} ` : ""}
                  на срок от {searchFromString} по {searchToString}.</p>
              </div>
            </div>
            <form className="trip-form" onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <div className="mb-3 mb-md-0 col-md-12">
                  <div className="form-control-wrap">
                    <select id="cf-1" name="title" className="form-control px-3" value={register} onChange={registerChange}>
                      <option value="1">Уже зарегистрирован</option>
                      <option value="2">Зарегистрироваться</option>
                    </select>
                    <input type="text" id="cf-2" required placeholder="Login" className="form-control px-3" />
                    <input type="text" id="cf-3" required placeholder="Password" className="form-control px-3" />
                    <ShowIf show={register == 2}>
                      <input type="text" id="cf-4" required placeholder="Phone" className="form-control px-3" />
                      <input type="text" id="cf-5" required placeholder="Email" className="form-control px-3" />
                    </ShowIf>
                    <input type="submit" value="Book Now" className="btn btn-primary btn-block py-3" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ShowIf>
    </main>
  );
}
