import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class CarModel
{
    public id: number;
    public name: string;
    public photo: string;
    public description: string;

    public static From(dbobject: any)
    {
        const res = new CarModel();
        res.id = dbobject.Id;
        res.name = dbobject.Name;
        res.photo = dbobject.Photo;
        res.description = dbobject.Description;

        return res;
    }

    public static async Create(Name: string, Photo: string, Description: string) {
        const res = new CarModel();
        res.name = Name;
        res.photo = Photo;
        res.description = Description;

        await this.Insert(res);

        return res;
    }

    public static async GetById(id: number)
    {
        const data = await CarModelRepository().select().where("Id", id).first();

        if (data) {
            return this.From(data);
        }

        return null;
    }

    public static async GetByName(name: string)
    {
        const data = await CarModelRepository().select().where("Name", name).first();

        if (data) {
            return this.From(data);
        }

        return null;
    }

    public static async Count(): Promise<number>
    {
        const data = await CarModelRepository().count("Id as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(id: number): Promise<boolean>
    {
        const res = await CarModelRepository().count("Id as c").where("Id", id).first() as any;

        return res.c > 0;
    }

    public static async Update(model: CarModel)
    {
        try {
            await CarModelRepository().where("Id", model.id).update({
                Name: model.name,
                Photo: model.photo,
                Description: model.description,
            });
            return new Requisite(true);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Insert(model: CarModel): Promise<Requisite<CarModel>>
    {
        try {
            const d = await CarModelRepository().insert({
                Name: model.name,
                Photo: model.photo,
                Description: model.description,
            })
            .returning("Id");

            model.id = d[0];
            Logger.info("Created CarModel " + model.id);

            return new Requisite(model);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Delete(id: number)
    {
        await CarModelRepository().delete().where("Id", id);

        Logger.info("Deleted CarModel " + id);

        return new Requisite().success();
    }

    public static async UseQuery(data: CarModel[])
    {
        const res = new Array<CarModel>();

        if (data) {
            for (const entry of data) {
                res.push(await this.From(entry));
            }

            return res;
        }

        return [];
    }

    public static async All(): Promise<CarModel[]>
    {
        const data = await CarModelRepository().select();
        return this.UseQuery(data);
    }
}

export const CarModelRepository = () => Connection<CarModel>("CarModels");
