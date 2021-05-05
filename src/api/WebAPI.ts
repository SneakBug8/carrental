import * as express from "express";
import { WebClient } from "./WebClient";
import { WebRouters } from "./routers/WebRouters";
import { Config } from "config";
import { WebClientUtil } from "./WebClientUtil";

export class WebAPI
{
    public static clients = new Array<WebClient>();

    public static Init(app: express.Express)
    {
        app.use(WebClientUtil.LoadClient);

        WebRouters.Init(app);
    }
}