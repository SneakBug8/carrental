import * as express from "express";
import { WebAPI } from "./WebAPI";
import * as cookieParser from "cookie-parser";
import { Logger } from "utility/Logger";
import { WebClientUtil } from "./WebClientUtil";
import { Config } from "config";
import bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static(Config.projectPath() + "/client/build"));
app.use(express.static(Config.projectPath() + "/public"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () =>
{
    Logger.info(`Server listening at http://localhost:${port}`);
});

app.use((req, res, next) =>
{
    Logger.info(req.method + " to " + req.url);
    next();
});

WebAPI.Init(app);
