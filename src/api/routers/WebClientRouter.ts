import * as express from "express";
import { body, param, query, validationResult } from "express-validator";
import * as bodyParser from "body-parser";
import { Config } from "config";
import { Player } from "entities/example";
import { FactoryManagementService } from "services/example";
import { IMyRequest, WebClientUtil } from "../WebClientUtil";
import { Car } from "entities/Car";
import { CarModel } from "entities/CarModel";
import { Location } from "entities/Location";
import { Requisite } from "services/Requisites/Requisite";

export class WebClientRouter
{
    public static GetRouter()
    {
        const router = express.Router();

        // router.use(this.LoadBackLink);

        router.use(bodyParser.urlencoded({ extended: true }));

        router.get("/car/all", this.onCars);
        router.post("/car/update", this.onCars);
        router.post("/car/insert", this.onCars);
        router.post("/car/delete", this.onCars);
        router.get("/car/all/populate", this.onCarsPopulated);
        router.get("/model/all", this.onModels);
        router.get("/location/all", this.onLocations);
        router.get("/order/all", this.onCars); // TODO:

        router.get("/register", this.onRegister);

        /*router.post("/register", [
            body("login", "Empty login").trim().isLength({ min: 4 }).escape(),
            body("password", "Empty password").notEmpty(),
            body("password", "Password too short").trim().isLength({ min: 6 }).escape(),
            body("passwordconfirm", "Empty passwordconfirmation").trim().isLength({ min: 6 }).escape(),
            body("passwordconfirm", "Pasword confirm must be same as password").custom((value, { req }) => req.body && req.body.password === value),
        ], this.registerAction);*/

        return router;
    }

    /*public static LoadBackLink(req: IMyRequest, res: express.Response, next: () => void)
    {
        if (!req.client || !req.client.getUrl()) {
            res.locals.backurl = "/";
            next();
            return;
        }

        if (req.url === req.client.getUrl()) {
            console.log("pop");
            req.client.popUrl();
            console.log(req.client.getUrl());
        }

        res.locals.backurl = req.client.getUrl();
        next();
    }*/

    public static onRegister(req: IMyRequest, res: express.Response)
    {
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async registerAction(req: IMyRequest, res: express.Response)
    {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            // Error messages can be returned in an array using `errors.array()`.
            // return WebClientUtil.error(req, res, errors.array()[0].msg);
        }

        const login = req.body.login;
        const password = req.body.password;

        res.redirect("/");
    }

    public static async onCars(req: IMyRequest, res: express.Response)
    {
        const cars = await Car.All();

        console.log(JSON.stringify(cars));
        res.json(cars);
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async onCarUpdate(req: IMyRequest, res: express.Response)
    {
        const car = JSON.parse(req.body) as Car;

        if (!car || !car.Id) {
            return;
        }

        console.log(JSON.stringify(car));
        const r = await Car.Update(car);

        res.json(r);
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async onCarsPopulated(req: IMyRequest, res: express.Response)
    {
        const cars = await Car.All();

        for (const car of cars) {
            await car.populate();
        }

        console.log(JSON.stringify(cars));
        res.json(cars);
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async onModels(req: IMyRequest, res: express.Response)
    {
        const models = await CarModel.All();

        console.log(JSON.stringify(models));
        res.json(models);
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async onLocations(req: IMyRequest, res: express.Response)
    {
        const locations = await Location.All();

        console.log(JSON.stringify(locations));
        res.json(locations);
        // WebClientUtil.render(req, res, "register", {}, false);
    }
}
