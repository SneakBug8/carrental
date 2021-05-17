import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";
import { ConvertAdminQuery } from "utility/AdminQuery";
import { CarOrdersService } from "services/CarOrdersService";

export class CarOrder
{
    public id: number;
    public carId: number;
    public from: Date;
    public to: Date;
    public customerName: string;

    public static From(dbobject: any)
    {
        const res = new CarOrder();
        res.id = dbobject.Id;
        res.carId = dbobject.CarId;
        res.from = new Date(dbobject.From);
        res.to = new Date(dbobject.To);
        res.customerName = dbobject.Customer;

        return res;
    }

    public static async Create(CarId: number, From: Date, To: Date, CustomerName: string)
    {
        const res = new CarOrder();
        res.carId = CarId;
        res.from = From;
        res.to = To;
        res.customerName = CustomerName;

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
        try {
            await CarOrderRepository().where("Id", order.id).update({
                Id: order.id,
                CarId: order.carId,
                From: new Date(order.from),
                To: new Date(order.to),
                CustomerId: order.customerName,
            });
            return new Requisite(true);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Insert(order: CarOrder): Promise<Requisite<CarOrder>>
    {
        try {
            const d = await CarOrderRepository().insert({
                Id: order.id,
                CarId: order.carId,
                From: new Date(order.from),
                To: new Date(order.to),
                CustomerId: order.customerName,
            }).returning("Id");

            order.id = d[0];

            Logger.info("Created CarOrder " + order.id);

            return new Requisite(order);
        }
        catch (e) {
            return new Requisite().error(e);
        }
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

    public static async Select()
    {
        return CarOrderRepository().select();
    }

    public static async All(): Promise<CarOrder[]>
    {
        const data = await CarOrderRepository().select();
        return this.UseQuery(data);
    }

    public static async GetOrdersForCarWithinTimeframe(carId: number, from: Date, to: Date): Promise<CarOrder[]>
    {
        const data = await CarOrderRepository().select()
        .where("CarId", carId).andWhere("From", ">", from).andWhere("To", "<", to);
        return this.UseQuery(data);
    }

    public static async GetMany(query: any): Promise<CarOrder[]>
    {
        const data = await ConvertAdminQuery(query, CarOrderRepository().select());
        return this.UseQuery(data);
    }
}

export const CarOrderRepository = () => Connection<CarOrder>("CarOrders");
