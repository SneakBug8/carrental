import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class CarModel
{
    public Name: string;
    public Photo: string;
    public Description: string;

    public static From(dbobject: any)
    {
        const res = new CarModel();
        res.Name = dbobject.Name;
        res.Photo = dbobject.Photo;
        res.Description = dbobject.Description;

        return res;
    }

    public static async Create(Name: string, Photo: string, Description: string) {
        const res = new CarModel();
        res.Name = Name;
        res.Photo = Photo;
        res.Description = Description;

        await this.Insert(res);

        return res;
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
        const data = await CarModelRepository().count("Name as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(name: string): Promise<boolean>
    {
        const res = await CarModelRepository().count("Name as c").where("Name", name).first() as any;

        return res.c > 0;
    }

    public static async Update(model: CarModel)
    {
        await CarModelRepository().where("Name", model.Name).update({
            Photo: model.Photo,
            Description: model.Description,
        });
    }

    public static async Insert(model: CarModel): Promise<number>
    {
        const d = await CarModelRepository().insert({
            Name: model.Name,
            Photo: model.Photo,
            Description: model.Description,
        });

        Logger.info("Created CarModel " + model.Name);

        return d[0];
    }

    public static async Delete(name: string)
    {
        const pcheck = await this.GetByName(name);

        await CarModelRepository().delete().where("Name", name);
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
