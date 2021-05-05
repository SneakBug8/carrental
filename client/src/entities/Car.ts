import { CarModel } from "./CarModel";
import { Location } from "./Location";

export class Car
{
    public Id: string = "";
    public ModelName: string = "";
    public LocationName: string = "";

    public Model: CarModel | null = null;
    public Location: Location | null = null;
}