import { Car } from "./entities/Car";
import { API } from "./API";
import { Requisite } from "./Requisite";
import { CarModel } from "./entities/CarModel";
import { Location } from "./entities/Location";
import { jquery } from ".";

class StateClass
{
  public carsLoaded = false;
  public cars: Car[] = [];

  public modelsLoaded = false;
  public models: CarModel[] = [];

  public locationsLoaded = false;
  public locations: Location[] = [];

  public searchModelId: number = 0;
  public searchModel?: CarModel;
  public searchFrom: Date = new Date();
  public searchFromString: string = "";
  public searchTo: Date = new Date();
  public searchToString: string = "";

  public async SearchCars()
  {
    console.log("SearchCars");

    this.searchFromString = this.searchFrom.toDateString();
    this.searchToString = this.searchTo.toDateString();
    const res = await API.SearchCars(this.searchModelId, this.searchFromString, this.searchToString);

    this.searchModel = this.models.find(x => x.id === this.searchModelId);
    console.log(res);

    if (!res.result) {
      return res;
    }

    return res;
  }

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

  public async GetLocations()
  {
    if (this.locationsLoaded) {
      return new Requisite(this.locations);
    }

    const res = await API.GetLocations();

    if (!res.result) {
      return res;
    }

    this.locations = res.data as Location[];
    this.locationsLoaded = true;

    return res;
  }
}

export const State = new StateClass();
