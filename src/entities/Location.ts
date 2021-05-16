import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";
import { ConvertAdminQuery } from "utility/AdminQuery";

export class Location
{
    public id: number;
    public name: string;

    public static From(dbobject: any)
    {
        const res = new Location();
        res.id = dbobject.Id;
        res.name = dbobject.Name;

        return res;
    }

    public static async Create(name: string)
    {
        const res = new Location();
        res.name = name;

        await this.Insert(res);

        return res;
    }

    public static async GetById(id: number)
    {
        const data = await LocationRepository().select().where("Id", id).first();

        if (data) {
            return this.From(data);
        }

        return null;
    }

    public static async GetByName(name: string)
    {
        const data = await LocationRepository().select().where("Name", name).first();

        if (data) {
            return this.From(data);
        }

        return null;
    }

    public static async Count(): Promise<number>
    {
        const data = await LocationRepository().count("Id as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(id: number): Promise<boolean>
    {
        const res = await LocationRepository().count("Id as c").where("Id", id).first() as any;

        return res.c > 0;
    }

    public static async Update(model: Location)
    {
        try {
            await LocationRepository().where("Id", model.id).update({
                Name: model.name,
            });
            return new Requisite(true);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Insert(location: Location): Promise<Requisite<Location>>
    {
        try {
            const d = await LocationRepository().insert({
                Name: location.name,
            }).returning("Id");

            location.id = d[0];

            Logger.info("Created Location " + location.id);

            return new Requisite(location);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Delete(id: number)
    {
        await LocationRepository().delete().where("Id", id);
        Logger.info("Deleted Location " + id);

        return new Requisite().success();
    }

    public static async UseQuery(data: Location[])
    {
        const res = new Array<Location>();

        if (data) {
            for (const entry of data) {
                res.push(await this.From(entry));
            }

            return res;
        }

        return [];
    }

    public static async All(): Promise<Location[]>
    {
        const data = await LocationRepository().select();
        return this.UseQuery(data);
    }

    public static async GetMany(query: any): Promise<Location[]>
    {
        const data = await ConvertAdminQuery(query, LocationRepository().select());
        return this.UseQuery(data);
    }
}

export const LocationRepository = () => Connection<Location>("Locations");
