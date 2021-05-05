import { Connection } from "DataBase";
import { Logger } from "utility/Logger";
import { Config } from "config";
import { Requisite } from "services/Requisites/Requisite";

export class Player
{
    public id: number;
    public username: string;
    public password: string;

    public CurrentMarketId: number;

    public isAdmin: number = 0;

    public static From(dbobject: any)
    {
        const res = new Player();
        res.id = dbobject.id;
        res.username = dbobject.username;
        res.password = dbobject.password;
        res.isAdmin = dbobject.isAdmin;
        res.CurrentMarketId = dbobject.CurrentMarketId;

        return res;
    }

    public async Verbose()
    {
        Logger.info(`Player ${this.username} (${this.id})`);
    }

    public static async GetById(id: number)
    {
        if (!id) {
            console.trace("GetById(null)");
            return new Requisite<Player>().error("GetById(null)");
        }

        const data = await PlayerRepository().select().where("id", id).first();

        if (data) {
            return new Requisite<Player>().success(this.From(data));
        }

        return new Requisite<Player>().error("No such player");
    }

    public static async GetWithLogin(login: string): Promise<Player>
    {
        const data = await PlayerRepository().select().where("username", login).first();

        if (data) {
            return this.From(data);
        }

        return null;
    }

    public static async GetCurrentMarketId(playerId: number)
    {
        const player = await Player.GetById(playerId);

        if (!player.result) {
            return player.to<number>();
        }

        return new Requisite<number>().success(player.data.CurrentMarketId);
    }

    public static async Count(): Promise<number>
    {
        const data = await PlayerRepository().count("id as c").first() as any;

        if (data) {
            return data.c;
        }

        return null;
    }

    public static async Exists(id: number): Promise<boolean>
    {
        const res = await PlayerRepository().count("id as c").where("id", id).first() as any;

        return res.c > 0;
    }

    public static async Update(player: Player)
    {
        await PlayerRepository().where("id", player.id).update({
            username: player.username,
            password: player.password,
            isAdmin: player.isAdmin,
            CurrentMarketId: player.CurrentMarketId,
        });
    }

    public static async Insert(player: Player): Promise<number>
    {
        const d = await PlayerRepository().insert({
            id: player.id,
            username: player.username,
            password: player.password,
            isAdmin: player.isAdmin,
            CurrentMarketId: player.CurrentMarketId,
        });

        player.id = d[0];

        Logger.info("Created player " + player.id);

        return d[0];
    }

    public static async Delete(id: number)
    {
        const pcheck = await this.GetById(id);
        if (!pcheck.result) {
            return pcheck;
        }

        const player = pcheck.data;

        await PlayerRepository().delete().where("id", id);

        return new Requisite().success();
    }

    public static async UseQuery(data: Player[])
    {
        const res = new Array<Player>();

        if (data) {
            for (const entry of data) {
                res.push(await this.From(entry));
            }

            return res;
        }

        return [];
    }

    public static async All(): Promise<Player[]>
    {
        const data = await PlayerRepository().select();
        return this.UseQuery(data);
    }
}

export const PlayerRepository = () => Connection<Player>("Players");
