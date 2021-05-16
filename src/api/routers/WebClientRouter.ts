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
import { Logger } from "utility/Logger";
import { CarOrder } from "entities/CarOrder";

export class WebClientRouter
{
    public static GetRouter()
    {
        const router = express.Router();

        // router.use(this.LoadBackLink);

        router.use(bodyParser.urlencoded({ extended: true }));

        router.get("/cars/:id", this.onCarGet);
        router.post("/cars", this.onCarInsert);
        router.put("/cars/:id", this.onCarUpdate);
        router.delete("/cars/:id", this.onCarDelete);
        router.all("/cars", this.onGetCars);

        router.all("/car/all/populate", this.onCarsPopulated);

        router.get("/models/:id", this.onGetModel);
        router.post("/models", this.onModelInsert);
        router.put("/models/:id", this.onModelUpdate);
        router.delete("/models/:id", this.onModelDelete);
        router.all("/models", this.onGetModels);

        router.get("/locations/:id", this.onGetLocation);
        router.post("/locations", this.onLocationInsert);
        router.put("/locations/:id", this.onLocationUpdate);
        router.delete("/locations/:id", this.onLocationDelete);
        router.all("/locations", this.onLocations);

        router.get("/orders/:id", this.onGetOrder);
        router.post("/orders", this.onOrderInsert);
        router.put("/orders/:id", this.onOrderInsert);
        router.delete("/orders/:id", this.onOrderDelete);
        router.all("/orders", this.onOrders);

        router.all("/register", this.onRegister);

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

    public static async onGetCars(req: IMyRequest, res: express.Response)
    {
        const cars = await Car.All();

        res.header("Content-Range", `cars 0-${cars.length}/${cars.length}`);
        res.json(cars);
    }

    public static async onCarGet(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await Car.GetById(id);
        res.json(r.data);
    }

    public static async onCarInsert(req: IMyRequest, res: express.Response)
    {
        const car = req.body as Car;

        console.log(car);

        const r = await Car.Insert(car);

        if (r.result) {
            return res.json(r.data);
        }
        Logger.error(r.toString());
    }

    public static async onCarUpdate(req: IMyRequest, res: express.Response)
    {
        let car = req.body as Car;

        if (!car || !car.id) {
            return;
        }

        const r = await Car.Update(car);

        if (!r.result) {
            Logger.error(r.message);
        }

        car = (await Car.GetById(car.id)).data;
        res.json(car);
    }

    public static async onCarDelete(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await Car.Delete(id);
        res.json(r);
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

    public static async onGetModels(req: IMyRequest, res: express.Response)
    {
        const models = await CarModel.All();

        res.header("Content-Range", `cars 0-${models.length}/${models.length}`);
        res.json(models);
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async onGetModel(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await CarModel.GetById(id);
        res.json(r);
    }

    public static async onModelInsert(req: IMyRequest, res: express.Response)
    {
        const model = req.body as CarModel;

        console.log(model);

        const r = await CarModel.Insert(model);

        if (r.result) {
            return res.json(r.data);
        }
        Logger.error(r.toString());
    }

    public static async onModelUpdate(req: IMyRequest, res: express.Response)
    {
        let model = req.body as CarModel;

        if (!model || !model.id) {
            return;
        }

        const r = await CarModel.Update(model);

        if (!r.result) {
            Logger.error(r.message);
        }

        model = (await CarModel.GetById(model.id));
        res.json(model);
    }

    public static async onModelDelete(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await CarModel.Delete(id);
        res.json(r);
    }

    public static async onLocations(req: IMyRequest, res: express.Response)
    {
        const locations = await Location.All();

        res.header("Content-Range", `locations 0-${locations.length}/${locations.length}`);
        res.json(locations);
    }

    public static async onGetLocation(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await Location.GetById(id);
        res.json(r);
    }

    public static async onLocationInsert(req: IMyRequest, res: express.Response)
    {
        const location = req.body as Location;

        console.log(location);

        const r = await Location.Insert(location);

        if (r.result) {
            return res.json(r.data);
        }
        Logger.error(r.toString());
    }

    public static async onLocationUpdate(req: IMyRequest, res: express.Response)
    {
        let location = req.body as Location;

        if (!location || !location.id) {
            return;
        }

        const r = await Location.Update(location);

        if (!r.result) {
            Logger.error(r.message);
        }

        location = (await Location.GetById(location.id));
        res.json(location);
    }

    public static async onLocationDelete(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await Location.Delete(id);
        res.json(r);
    }

    public static async onOrders(req: IMyRequest, res: express.Response)
    {
        const locations = await CarOrder.All();

        res.header("Content-Range", `orders 0-${locations.length}/${locations.length}`);
        res.json(locations);
    }

    public static async onGetOrder(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await CarOrder.GetById(id);
        res.json(r);
    }

    public static async onOrderDelete(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await CarOrder.Delete(id);
        res.json(r);
    }

    public static async onOrderInsert(req: IMyRequest, res: express.Response)
    {
        const location = req.body as CarOrder;

        console.log(location);

        const r = await CarOrder.Insert(location);

        if (r.result) {
            return res.json(r.data);
        }

        Logger.error(r.toString());
    }

    public static async onOrderUpdate(req: IMyRequest, res: express.Response)
    {
        let location = req.body as CarOrder;

        if (!location || !location.id) {
            return;
        }

        const r = await CarOrder.Update(location);

        if (!r.result) {
            Logger.error(r.message);
        }

        location = (await CarOrder.GetById(location.id));
        res.json(location);
    }
}
