import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class Location
{
    public Name: string;

    public static From(dbobject: any)
    {
        const res = new Location();
        res.Name = dbobject.Name;

        return res;
    }

    public static async Create(name: string) {
        const res = new Location();
        res.Name = name;

        await this.Insert(res);

        return res;
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
        const data = await LocationRepository().count("Name as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(name: string): Promise<boolean>
    {
        const res = await LocationRepository().count("Name as c").where("Name", name).first() as any;

        return res.c > 0;
    }

    public static async Update(model: Location)
    {
        await LocationRepository().where("Name", model.Name).update({
            Name: model.Name,
        });
    }

    public static async Insert(model: Location): Promise<number>
    {
        const d = await LocationRepository().insert({
            Name: model.Name,
        });

        Logger.info("Created Location " + model.Name);

        return d[0];
    }

    public static async Delete(name: string)
    {
        const pcheck = await this.GetByName(name);
        if (!pcheck) {
            return pcheck;
        }

        await LocationRepository().delete().where("Name", name);
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
}

export const LocationRepository = () => Connection<Location>("Locations");
