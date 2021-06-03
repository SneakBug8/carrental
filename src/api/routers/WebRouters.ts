import { Config } from "config";
import * as express from "express";
import { IMyRequest, WebClientUtil } from "../WebClientUtil";
import { WebClientRouter } from "./WebClientRouter";
import * as path from "path";
import { WebPrintRouter } from "./WebPrintRouter";

export class WebRouters
{
    public static Init(app: express.Express)
    {
        app.use("/api", WebClientRouter.GetRouter());
        app.use("/print", WebPrintRouter.GetRouter());

        app.use((req, res) =>
        {
            console.log("Serving React App");
            res.sendFile(path.resolve(Config.projectPath() + "/client/build/index.html"));
        });

        app.use(this.on404);

        // app.use("/api", WebAPIRouter.GetRouter());
    }

    public static on404(req: IMyRequest, res: express.Response)
    {
        // WebClientUtil.render(req, res, "404", {}, false);
    }
}
