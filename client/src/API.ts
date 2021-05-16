import axios from "axios";
import { Requisite } from "./Requisite";
import { Car } from "./entities/Car";
import { CarModel } from "./entities/CarModel";
import { Location } from "./entities/Location";

export class API
{
  public static async GetCars()
  {
    try {
      const resp = await axios.get("/api/cars");

      return new Requisite<Car[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Car[]>().error(e);
    }
  }

  public static async GetCarsPopulate()
  {
    try {
      const resp = await axios.get("/api/cars/populate");

      return new Requisite<Car[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Car[]>().error(e);
    }
  }

  public static async GetModels()
  {
    try {
      const resp = await axios.get("/api/models");

      return new Requisite<CarModel[]>(resp.data);
    }
    catch (e) {
      return new Requisite<CarModel[]>().error(e);
    }
  }

  public static async GetLocations()
  {
    try {
      const resp = await axios.get("/api/locations");

      return new Requisite<Location[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Location[]>().error(e);
    }
  }

  public static async SearchCars(modelId: number, from: string, to: string)
  {
    try {
      const resp = await axios.get(`/api/cars/search?modelId=${modelId}&date=["${from}", "${to}"]`);

      return new Requisite<Car[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Car[]>().error(e);
    }
  }
}