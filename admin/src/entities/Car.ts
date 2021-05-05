import { CarModel } from "./CarModel";
import { Location } from "./Location";

export class Car
{
    public id: string = "";
    public modelName: string = "";
    public locationName: string = "";

    public Model: CarModel | null = null;
    public Location: Location | null = null;
}