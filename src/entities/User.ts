import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class User
{
    public Login: string;
    public Password: string;
    public Role: number = 1;

    public static From(dbobject: any)
    {
        const res = new User();
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
        const data = await UserRepository().count("Login as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(name: string): Promise<boolean>
    {
        const res = await UserRepository().count("Login as c").where("Login", name).first() as any;

        return res.c > 0;
    }

    public static async Update(user: User)
    {
        await UserRepository().where("Login", user.Login).update({
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

        Logger.info("Created user " + user.Login);

        return d[0];
    }

    public static async Delete(name: string)
    {
        const pcheck = await this.GetByName(name);
        if (!pcheck.result) {
            return pcheck;
        }

        await UserRepository().delete().where("Login", name);
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
