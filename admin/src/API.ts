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
      const resp = await axios.get("/api/car/all");

      return new Requisite<Car[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Car[]>().error(e);
    }
  }

  public static async GetCarsPopulate()
  {
    try {
      const resp = await axios.get("/api/car/all/populate");

      return new Requisite<Car[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Car[]>().error(e);
    }
  }

  public static async GetModels()
  {
    try {
      const resp = await axios.get("/api/model/all");

      return new Requisite<CarModel[]>(resp.data);
    }
    catch (e) {
      return new Requisite<CarModel[]>().error(e);
    }
  }

  public static async GetLocations()
  {
    try {
      const resp = await axios.get("/api/location/all");

      return new Requisite<Location[]>(resp.data);
    }
    catch (e) {
      return new Requisite<Location[]>().error(e);
    }
  }
}