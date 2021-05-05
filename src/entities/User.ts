import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class User
{
    public Id: number;
    public Login: string;
    public Password: string;
    public Role: number = 1;

    public static From(dbobject: any)
    {
        const res = new User();
        res.Id = dbobject.Id;
        res.Login = dbobject.Login;
        res.Password = dbobject.Password;
        res.Role = dbobject.Role;

        return res;
    }

    public static async Create(login: string, password: string) {
        const res = new User();
        res.Login = login;
        res.Password = password;

        await this.Insert(res);

        return res;
    }

    public static async GetById(id: number)
    {
        const data = await UserRepository().select().where("Id", id).first();

        if (data) {
            return new Requisite<User>().success(this.From(data));
        }

        return new Requisite<User>().error("No such player");
    }

    public static async GetByName(name: string)
    {
        const data = await UserRepository().select().where("Login", name).first();

        if (data) {
            return new Requisite<User>().success(this.From(data));
        }

        return new Requisite<User>().error("No such player");
    }

    public static async Count(): Promise<number>
    {
        const data = await UserRepository().count("Id as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(id: number): Promise<boolean>
    {
        const res = await UserRepository().count("Id as c").where("Id", id).first() as any;

        return res.c > 0;
    }

    public static async Update(user: User)
    {
        await UserRepository().where("Id", user.Id).update({
            Login: user.Login,
            Password: user.Password,
            Role: user.Role,
        });
    }

    public static async Insert(user: User): Promise<number>
    {
        const d = await UserRepository().insert({
            Login: user.Login,
            Password: user.Password,
            Role: user.Role,
        });

        Logger.info("Created user " + user.Id);

        return d[0];
    }

    public static async Delete(id: number)
    {
        const pcheck = await this.GetById(id);
        if (!pcheck.result) {
            return pcheck;
        }

        await UserRepository().delete().where("Id", id);
        return new Requisite().success();
    }

    public static async UseQuery(data: User[])
    {
        const res = new Array<User>();

        if (data) {
            for (const entry of data) {
                res.push(await this.From(entry));
            }

            return res;
        }

        return [];
    }

    public static async All(): Promise<User[]>
    {
        const data = await UserRepository().select();
        return this.UseQuery(data);
    }
}

export const UserRepository = () => Connection<User>("Users");
