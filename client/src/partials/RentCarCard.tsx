import React, { PropsWithChildren } from "react";
import { Car } from "../entities/Car";
import { useStore } from "react-context-hook";
import { RouteComponentProps } from "react-router-dom";
import { State } from "../State";
import { CarModel } from "../entities/CarModel";

export const RentCarCard = ({ car, history }: (RouteComponentProps & { car: Car, key: any })) =>
{
  const [rentCarId, setRentCarId] = useStore("rentCarId", 0);
  const [searchModel, setSearchModel] = useStore("searchModel");

  async function onClick(event: React.MouseEvent<HTMLAnchorElement>)
  {
    setRentCarId((event.target as HTMLElement).id);

    const models = (await State.GetModels()).data;
    setSearchModel(models.find((x: CarModel) => x.id === car.modelId));
    history.push("/rent");
    event.preventDefault();
  }

  return (< div className="col-md-6 col-lg-4 mb-4" >
    <div className="listing d-block  align-items-stretch">
      <div className="listing-img h-100 mr-4">
        <img src={(car.Model as any).photo} alt="Image" className="img-fluid" />
      </div>
      <div className="listing-contents h-100">
        <h3>{car.Model ? car.Model.name : ""} №{car.id}</h3>
        <div>
          <p>Местоположение: {car.Location ? car.Location.name : ""}</p>
          <p>{car.Model ? car.Model.description : ""}</p>
          <p><a href="#" className="btn btn-primary btn-sm" id={car.id + ""} onClick={onClick}>Rent Now</a></p>
        </div>
      </div>
    </div>
  </div >);
};
