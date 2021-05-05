import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";
import { CarModel } from "./CarModel";
import { Location } from "./Location";

export class Car
{
    public id: number;
    public modelId: number;
    public locationId: number;

    public color: string;

    public Model: CarModel | null;
    public Location: Location | null;

    public static From(dbobject: any)
    {
        const res = new Car();
        res.id = dbobject.Id;
        res.modelId = dbobject.ModelId;
        res.locationId = dbobject.LocationId;
        res.color = dbobject.Color;

        return res;
    }

    public static async Create(ModelId: number, LocationId: number)
    {
        const res = new Car();
        res.modelId = ModelId;
        res.locationId = LocationId;

        await this.Insert(res);

        return res;
    }

    public async populate()
    {
        this.Model = await this.getModel();
        this.Location = await this.getLocation();

        return this;
    }

    public async getModel()
    {
        return await CarModel.GetById(this.modelId);
    }

    public async getLocation()
    {
        return await Location.GetById(this.locationId);
    }

    public static async GetById(id: number)
    {
        const data = await CarRepository().select().where("Id", id).first();

        if (data) {
            return new Requisite<Car>().success(this.From(data));
        }

        return new Requisite<Car>().error("No such car");
    }

    public static async GetWithLocation(name: string)
    {
        const data = await CarRepository().select().where("LocationId", name);
        return this.UseQuery(data);
    }

    public static async GetWithModel(name: string)
    {
        const data = await CarRepository().select().where("ModelId", name);
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

    public static async Exists(id: number): Promise<boolean>
    {
        const res = await CarRepository().count("Id as c").where("Id", id).first() as any;

        return res.c > 0;
    }

    public static async Update(model: Car)
    {
        try {
            await CarRepository().where("Id", model.id).update({
                ModelId: model.modelId,
                LocationId: model.locationId,
                Color: model.color,
            });
            return new Requisite(true);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Insert(model: Car): Promise<Requisite<Car>>
    {
        try {
            const d = await CarRepository().insert({
                ModelId: model.modelId,
                LocationId: model.locationId,
                Color: model.color,
            })
            .returning("Id");

            model.id = d[0];
            Logger.info("Created Car " + model.id);

            return new Requisite(model);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Delete(id: number)
    {
        const pcheck = await this.Exists(id);
        if (!pcheck) {
            return pcheck;
        }

        await CarRepository().delete().where("Id", id);
        Logger.info(`Deleted Car ${id}`);

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
