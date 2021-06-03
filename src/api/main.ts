import * as express from "express";
import * as exphbs from "express-handlebars";
import { WebAPI } from "./WebAPI";
import * as cookieParser from "cookie-parser";
import { Logger } from "utility/Logger";
import { WebClientUtil } from "./WebClientUtil";
import { Config } from "config";
import bodyParser = require("body-parser");

const app = express();
const port = 3000;

const hbs = exphbs.create({ extname: ".hbs"});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");

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
    if (!req.url.startsWith("/api") && !req.url.startsWith("/print")) {
        return;
    }

    Logger.info(req.method + " to " + req.url);
    if (Object.keys(req.body).length) {
        Logger.info(JSON.stringify(req.body));
    }
    if (Object.keys(req.query).length) {
        Logger.info(JSON.stringify(req.query));
    }
    next();
});

WebAPI.Init(app);
