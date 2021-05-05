import { Car } from "./entities/Car";
import { API } from "./API";
import { Requisite } from "./Requisite";
import { CarModel } from "./entities/CarModel";

class StateClass
{
  public carsLoaded = false;
  public cars: Car[] = [];

  public modelsLoaded = false;
  public models: CarModel[] = [];

  public async GetCars()
  {
    if (this.carsLoaded) {
      return new Requisite(this.cars);
    }

    const res = await API.GetCarsPopulate();

    if (!res.result) {
      return res;
    }

    this.cars = res.data as Car[];
    this.carsLoaded = true;

    return res;
  }

  public async GetModels()
  {
    if (this.modelsLoaded) {
      return new Requisite(this.models);
    }

    const res = await API.GetModels();

    if (!res.result) {
      return res;
    }

    this.models = res.data as CarModel[];
    this.modelsLoaded = true;

    return res;
  }
}

export const State = new StateClass();
