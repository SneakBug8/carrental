import { CarModel } from "./CarModel";
import { Location } from "./Location";

export class Car
{
    public id: number = 0;
    public modelId: number = 0;
    public locationId: number = 0;

    public color: string = "";

    public Model: CarModel | null = null;
    public Location: Location | null = null;
}