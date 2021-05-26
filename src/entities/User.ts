import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";
import { ConvertAdminQuery } from "utility/AdminQuery";

export class User
{
    public id: number;
    public login: string;
    public password: string;
    public role: number = 1;
    public phoneNumber: string;
    public email: string;

    public static From(dbobject: any)
    {
        const res = new User();
        res.id = dbobject.Id;
        res.login = dbobject.Login;
        res.password = dbobject.Password;
        res.role = dbobject.Role;
        res.phoneNumber = dbobject.PhoneNumber;
        res.email = dbobject.Email;

        return res;
    }

    public static async Create(login: string, password: string)
    {
        const res = new User();
        res.login = login;
        res.password = password;

        return await this.Insert(res);
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
        try {
            await UserRepository().where("Id", user.id).update({
                Login: user.login,
                Password: user.password,
                Role: user.role,
                PhoneNumber: user.phoneNumber,
                Email: user.email,
            });
            return new Requisite(true);
        }
        catch (e) {
            return new Requisite().error(e);
        }
    }

    public static async Insert(user: User): Promise<Requisite<User>>
    {
        try {
            const d = await UserRepository().insert({
                Login: user.login,
                Password: user.password,
                Role: user.role,
                PhoneNumber: user.phoneNumber,
                Email: user.email,
            }).returning("Id");

            user.id = d[0];

            Logger.info("Created user " + user.id);

            return new Requisite(user);
        }
        catch (e) {
            return new Requisite().error(e);
        }
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

    public static async GetMany(query: any): Promise<User[]>
    {
        const data = await ConvertAdminQuery(query, UserRepository().select());
        return this.UseQuery(data);
    }
}

export const UserRepository = () => Connection<User>("Users");
