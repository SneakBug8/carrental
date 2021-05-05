import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class CarOrder
{
    public Id: string;
    public CarName: string;
    public From: Date;
    public To: Date;
    public CustomerName: string;

    public static From(dbobject: any)
    {
        const res = new CarOrder();
        res.Id = dbobject.Id;
        res.CarName = dbobject.Car;
        res.From = new Date(dbobject.From);
        res.To = new Date(dbobject.To);
        res.CustomerName = dbobject.Customer;

        return res;
    }

    public static async Create(CarName: string, From: Date, To: Date, CustomerName: string) {
        const res = new CarOrder();
        res.CarName = CarName;
        res.From = From;
        res.To = To;
        res.CustomerName = CustomerName;

        await this.Insert(res);

        return res;
    }

    public static async GetById(id: number)
    {
        const data = await CarOrderRepository().select().where("Id", id).first();

        if (data) {
            return this.From(data);
        }

        return null;
    }

    public static async Count(): Promise<number>
    {
        const data = await CarOrderRepository().count("Id as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(id: string): Promise<boolean>
    {
        const res = await CarOrderRepository().count("Id as c").where("Id", id).first() as any;

        return res.c > 0;
    }

    public static async Update(order: CarOrder)
    {
        /*
        res.Id = dbobject.Id;
        res.CarName = dbobject.Car;
        res.From = new Date(dbobject.From);
        res.To = new Date(dbobject.To);
        res.CustomerName = dbobject.Customer;
        */
        await CarOrderRepository().where("Id", order.Id).update({
            Id: order.Id,
            Car: order.CarName,
            From: order.From,
            To: order.To,
            Customer: order.CustomerName,
        });
    }

    public static async Insert(order: CarOrder): Promise<number>
    {
        const d = await CarOrderRepository().insert({
            Id: order.Id,
            Car: order.CarName,
            From: order.From,
            To: order.To,
            Customer: order.CustomerName,
        });

        Logger.info("Created CarOrder " + order.Id);

        return d[0];
    }

    public static async Delete(id: number)
    {
        const pcheck = await this.GetById(id);

        await CarOrderRepository().delete().where("Id", id);
        return new Requisite().success();
    }

    public static async UseQuery(data: CarOrder[])
    {
        const res = new Array<CarOrder>();

        if (data) {
            for (const entry of data) {
                res.push(await this.From(entry));
            }

            return res;
        }

        return [];
    }

    public static async All(): Promise<CarOrder[]>
    {
        const data = await CarOrderRepository().select();
        return this.UseQuery(data);
    }
}

export const CarOrderRepository = () => Connection<CarOrder>("CarOrders");
