import { WebClient } from "api/WebClient";
import { User } from "entities/User";
import { Requisite } from "./Requisites/Requisite";

export class UserService
{
    public async Authorize(login: string, password: string, client: WebClient)
    {
        const user = await User.GetByName(login);

        if (!user.result || user.data.Password !== password) {
            return new Requisite().error("Неверные логин или пароль.");
        }

        client.attach(user.data);

        return new Requisite(user).success("Успешно авторизован.");
    }

    public async Register(login: string, password: string, client: WebClient)
    {
        const user = await User.Create(login, password);

        client.attach(user);

        return new Requisite(user).success("Успешно зарегистрирован.");
    }

    public async RegisterNoPassword(login: string, client: WebClient)
    {
        const password = Math.round(Math.random() * 1000000) + "";
        const user = await User.Create(login, password);

        client.attach(user);

        return new Requisite(user).success("Успешно зарегистрирован.");
    }
}
