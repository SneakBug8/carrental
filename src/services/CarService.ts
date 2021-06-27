import { Car } from "entities/Car";
import { CarOrder } from "entities/CarOrder";

export class CarService
{
  public static async GetAvailableCars(modelId: number, from: Date, to: Date)
  {
    const carsofthatmodel = await Car.GetWithModel(modelId);
    const res = [];
    for (const car of carsofthatmodel) {
      const orders = await CarOrder.GetOrdersForCarWithinTimeframe(car.id, from, to);

      if (!orders.length) {
        await car.populate();
        res.push(car);
      }
    }

    return res;
  }

  public static async GetLocationCars(locationId: number, from: Date, to: Date)
  {
    const locationcars = await Car.GetWithLocation(locationId);
    const res = [];
    for (const car of locationcars) {
      const orders = await CarOrder.GetOrdersForCarWithinTimeframe(car.id, from, to);

      if (!orders.length) {
        await car.populate();
        res.push(car);
      }
    }

    return res;
  }
}