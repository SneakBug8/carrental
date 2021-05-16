import { Car } from "./entities/Car";
import { API } from "./API";
import { Requisite } from "./Requisite";
import { CarModel } from "./entities/CarModel";
import { Location } from "./entities/Location";
import { jquery } from ".";
import { store } from 'react-context-hook';

class StateClass
{
  public async SearchCars()
  {
    let state = store.getState();

    store.set("searchFromString", state.searchFrom.toDateString());
    store.set("searchToString", state.searchTo.toDateString());

    state = store.getState();

    const res = await API.SearchCars(state.searchModelId, state.searchFromString, state.searchToString);

    const models = (await this.GetModels()).data;
    store.set("searchModel", models.find((x: CarModel) => x.id === state.searchModelId));

    if (!res.result) {
      return res;
    }

    return res;
  }

  public async GetCars()
  {
    const state = store.getState();

    if (state.carsLoaded) {
      return new Requisite(state.cars);
    }

    const res = await API.GetCarsPopulate();

    if (!res.result) {
      return res;
    }

    store.set("cars", res.data as Car[]);
    store.set("carsLoaded", true);

    return res;
  }

  public async GetModels()
  {
    const state = store.getState();

    if (state.modelsLoaded) {
      return new Requisite(state.models);
    }

    const res = await API.GetModels();

    if (!res.result) {
      return res;
    }

    store.set("models", res.data as CarModel[]);
    store.set("modelsLoaded", true);

    return res;
  }

  public async GetLocations()
  {
    const state = store.getState();

    if (state.locationsLoaded) {
      return new Requisite(state.locations);
    }

    const res = await API.GetLocations();

    if (!res.result) {
      return res;
    }

    store.set("locations", res.data as Location[]);
    store.set("locationsLoaded", true);

    return res;
  }
}

export const State = new StateClass();
