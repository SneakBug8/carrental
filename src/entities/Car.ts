import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";
import { CarModel } from "./CarModel";
import { Location } from "./Location";

export class Car
{
    public Id: string;
    public ModelName: string;
    public LocationName: string;

    public Model: CarModel | null;
    public Location: Location | null;

    public static From(dbobject: any)
    {
        const res = new Car();
        res.Id = dbobject.Id;
        res.ModelName = dbobject.Model;
        res.LocationName = dbobject.Location;

        return res;
    }

    public static async Create(ModelName: string, LocationName: string) {
        const res = new Car();
        res.ModelName = ModelName;
        res.LocationName = LocationName;

        await this.Insert(res);

        return res;
    }

    public async populate() {
        this.Model = await this.getModel();
        this.Location = await this.getLocation();

        return this;
    }

    public async getModel() {
        return await CarModel.GetByName(this.ModelName);
    }

    public async getLocation() {
        return await Location.GetByName(this.LocationName);
    }

    public static async GetByName(name: string)
    {
        const data = await CarRepository().select().where("Name", name).first();

        if (data) {
            return new Requisite<Car>().success(this.From(data));
        }

        return new Requisite<Car>().error("No such car");
    }

    public static async GetWithLocation(name: string)
    {
        const data = await CarRepository().select().where("Location", name);
        return this.UseQuery(data);
    }

    public static async GetWithModel(name: string)
    {
        const data = await CarRepository().select().where("Model", name);
        return this.UseQuery(data);
    }

    public static async Count(): Promise<number>
    {
        const data = await CarRepository().count("Name as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(name: string): Promise<boolean>
    {
        const res = await CarRepository().count("Name as c").where("Name", name).first() as any;

        return res.c > 0;
    }

    public static async Update(model: Car)
    {
        await CarRepository().where("Id", model.Id).update({
            Model: model.ModelName,
            Location: model.LocationName,
        });
    }

    public static async Insert(model: Car): Promise<number>
    {
        const d = await CarRepository().insert({
            Model: model.ModelName,
            Location: model.LocationName,
        });

        Logger.info("Created Car " + model.Id);

        return d[0];
    }

    public static async Delete(name: string)
    {
        const pcheck = await this.GetByName(name);
        if (!pcheck.result) {
            return pcheck;
        }

        await CarRepository().delete().where("Name", name);
        return new Requisite().success();
    }

    public static async UseQuery(data: Car[])
    {
        const res = new Array<Car>();

        if (data) {
            for (const entry of data) {
                res.push(await this.From(entry));
            }

            return res;
        }

        return [];
    }

    public static async All(): Promise<Car[]>
    {
        const data = await CarRepository().select();
        return this.UseQuery(data);
    }
}

export const CarRepository = () => Connection<Car>("Cars");
