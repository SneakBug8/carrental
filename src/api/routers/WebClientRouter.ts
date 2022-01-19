import * as express from "express";
import { body, param, query, validationResult } from "express-validator";
import * as bodyParser from "body-parser";
import { Config } from "config";
import { IMyRequest, WebClientUtil } from "../WebClientUtil";
import { Car } from "entities/Car";
import { CarModel } from "entities/CarModel";
import { Location } from "entities/Location";
import { Requisite } from "services/Requisites/Requisite";
import { Logger } from "utility/Logger";
import { CarOrder } from "entities/CarOrder";
import { User } from "entities/User";
import { ParseAdminQuery } from "utility/AdminQuery";
import { CarService } from "services/CarService";
import { CarOrdersService } from "services/CarOrdersService";
import { MIS_DT } from "utility/MIS_DT";

export class WebClientRouter
{
    public static GetRouter()
    {
        const router = express.Router();

        // router.use(this.LoadBackLink);

        router.use(bodyParser.urlencoded({ extended: true }));

        // Cars
        router.get("/cars/search", this.onCarsSearch);
        router.get("/cars/search2", this.onCarsSearchNew);

        router.get("/cars/count", this.onCarsCount);

        router.get("/cars/bylocation", this.onCarsByLocation);
        router.get("/cars/bymodel", this.onCarsByModel);


        router.all("/cars/populate", this.onCarsPopulated);
        router.get("/cars/:id", this.onCarGet);
        router.post("/cars", this.onCarInsert);
        router.put("/cars/:id", this.onCarUpdate);
        router.delete("/cars/:id", this.onCarDelete);
        router.all("/cars", this.onGetCars);

        // CarModels
        router.get("/models/:id", this.onGetModel);
        router.post("/models", this.onModelInsert);
        router.put("/models/:id", this.onModelUpdate);
        router.delete("/models/:id", this.onModelDelete);
        router.all("/models", this.onGetModels);

        // Locations
        router.get("/locations/:id", this.onGetLocation);
        router.post("/locations", this.onLocationInsert);
        router.put("/locations/:id", this.onLocationUpdate);
        router.delete("/locations/:id", this.onLocationDelete);
        router.all("/locations", this.onLocations);

        // CarOrders
        router.get("/orders/filter", this.onOrdersFilter);

        router.get("/orders/new", this.onNewOrders);
        router.get("/orders/today", this.onCarsRentedToday);
        router.get("/orders/latest", this.onLatestOrders);

        router.get("/orders/:id", this.onGetOrder);
        router.post("/orders", this.onOrderInsert);
        router.put("/orders/:id", this.onOrderUpdate);
        router.delete("/orders/:id", this.onOrderDelete);
        router.all("/orders", this.onOrders);

        // Users
        router.get("/users/:id", this.onGetUser);
        router.post("/users", this.onInsertUser);
        router.put("/users/:id", this.onUpdateUser);
        router.delete("/users/:id", this.onDeleteUser);
        router.all("/users", this.onUsers);

        router.post("/register", this.onRegister);
        router.post("/auth", this.onAuth);
        router.post("/login", this.onAuth);
        router.post("/rent", this.onRent);

        router.all(new RegExp(".*"), this.on404);

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

    public static on404(req: IMyRequest, res: express.Response)
    {
        res.json(new Requisite().code(404).error("Not found").toJSON());
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
        const cars = await Car.GetMany(req.query);

        const adminquery = ParseAdminQuery(req.query);
        const count = await Car.Count();

        res.header("Content-Range", `cars ${adminquery.from}-${adminquery.to}/${count}`);
        res.json(cars);
    }

    public static async onCarsCount(req: IMyRequest, res: express.Response)
    {
        const cars = await Car.GetMany(req.query);

        const adminquery = ParseAdminQuery(req.query);
        const count = await Car.Count();

        res.json({count});
    }

    public static async onCarsSearch(req: IMyRequest, res: express.Response)
    {
        const date = JSON.parse(req.query.date as string);
        const modelId = Number.parseInt(req.query.modelId as string, 10);

        const from = new Date(date[0]);
        const to = new Date(date[1]);

        if (from > to || Date.now() > from.getTime() || Date.now() > to.getTime()) {
            res.json([]); return;
        }
        const cars = await CarService.GetAvailableCars(modelId, from, to);
        res.json(cars);
    }

    public static async onCarsSearchNew(req: IMyRequest, res: express.Response)
    {
        const date = JSON.parse(req.query.date as string);
        const locationId = Number.parseInt(req.query.locationId as string, 10);

        const from = new Date(date[0]);
        const to = new Date(date[1]);

        if (from > to || Date.now() > from.getTime() || Date.now() > to.getTime()) {
            res.json([]); return;
        }
        const cars = await CarService.GetLocationCars(locationId, from, to);
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

        res.json(cars);
        // WebClientUtil.render(req, res, "register", {}, false);
    }

    public static async onCarsByLocation(req: IMyRequest, res: express.Response)
    {
        const data = await Car.CountByLocation();

        const names = [];
        const counts = [];

        for (const d of data) {
            const loc = await Location.GetById(d.LocationId);
            names.push(loc.name);
            counts.push(d.count);
        }

        res.json({
            names,
            counts
        });

        //res.json(data);

    }

    public static async onCarsByModel(req: IMyRequest, res: express.Response)
    {
        const data = await Car.CountByModel();

        const names = [];
        const counts = [];

        for (const d of data) {
            const loc = await CarModel.GetById(d.ModelId);
            names.push(loc.name);
            counts.push(d.count);
        }

        res.json({
            names,
            counts
        });

        //res.json(data);

    }

    public static async onGetModels(req: IMyRequest, res: express.Response)
    {
        const models = await CarModel.GetMany(req.query);

        const adminquery = ParseAdminQuery(req.query);
        const count = await CarModel.Count();

        res.header("Content-Range", `models ${adminquery.from}-${adminquery.to}/${count}`);
        res.json(models);
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
        const locations = await Location.GetMany(req.query);

        const adminquery = ParseAdminQuery(req.query);
        const count = await Location.Count();

        res.header("Content-Range", `locations ${adminquery.from}-${adminquery.to}/${count}`);
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
        const orders = await CarOrder.GetMany(req.query);

        const adminquery = ParseAdminQuery(req.query);
        const count = await CarOrder.Count();

        res.header("Content-Range", `orders ${adminquery.from}-${adminquery.to}/${count}`);
        res.json(orders);
    }

    public static async onOrdersFilter(req: IMyRequest, res: express.Response)
    {
        const orders = await CarOrdersService.ProcessReactQuery(req.query);
        res.json(orders);
    }

    public static async onGetOrder(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await CarOrder.GetById(id);
        res.json(r);
    }

    public static async onNewOrders(req: IMyRequest, res: express.Response)
    {
        const d = await CarOrder.GetNewOrders();

        res.json({count: d.length});
    }

    public static async onCarsRentedToday(req: IMyRequest, res: express.Response)
    {
        const d = await CarOrder.GetOrdersWithinTimeframe(
            new Date(MIS_DT.GetExact() - MIS_DT.OneDay()), new Date(MIS_DT.GetExact()));

        res.json({count: d.length});
    }

    public static async onLatestOrders(req: IMyRequest, res: express.Response)
    {
        const d = await CarOrder.GetLatestOrders();

        for (const o of d) {
            (o as any).user = (await User.GetById(o.customerId)).data;
        }

        res.json(d);
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

    public static async onUsers(req: IMyRequest, res: express.Response)
    {
        const users = await User.GetMany(req.query);

        const adminquery = ParseAdminQuery(req.query);
        const count = await User.Count();

        res.header("Content-Range", `users ${adminquery.from}-${adminquery.to}/${count}`);
        res.json(users);
    }

    public static async onGetUser(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await User.GetById(id);
        if (r.result) {
            return res.json(r.data);
        }
        Logger.error(r.toString());
    }

    public static async onDeleteUser(req: IMyRequest, res: express.Response)
    {
        const id = Number.parseInt(req.params.id, 10);
        const r = await User.Delete(id);
        res.json(r);
    }

    public static async onInsertUser(req: IMyRequest, res: express.Response)
    {
        const user = req.body as User;

        console.log(user);

        const r = await User.Insert(user);

        if (r.result) {
            return res.json(r.data);
        }

        Logger.error(r.toString());
    }

    public static async onUpdateUser(req: IMyRequest, res: express.Response)
    {
        let user = req.body as User;

        if (!user || !user.id) {
            return;
        }

        const r = await User.Update(user);

        if (!r.result) {
            Logger.error(r.message);
        }

        user = (await User.GetById(user.id)).data;
        res.json(user);
    }

    public static async onRegister(req: IMyRequest, res: express.Response)
    {
        const data = req.body;

        if (!data.login || !data.password || !data.phone || !data.email) {
            return res.json(new Requisite().code(202).error("Wrong data sent.").toJSON());
        }

        const r = await User.Create(data.login, data.password);

        if (!r.result) {
            res.json(new Requisite().code(401).error("Such user already registered").toJSON()); return;
        }

        const user = r.data;
        user.email = data.email;
        user.phoneNumber = data.phone;
        user.name = data.name;

        const r2 = User.Update(user);

        return res.json(new Requisite({ userId: r.data.id }));
    }

    public static async onAuth(req: IMyRequest, res: express.Response)
    {
        const data = req.body;

        if (!data.login || !data.password) {
            return res.json(new Requisite().code(202).error("Wrong data sent.").toJSON());
        }

        const user = await User.GetByName(data.login);
        if (!user.result || user.data.password !== data.password) {
            return res.json(new Requisite().code(201).error("Wrong login or password.").toJSON());
        }

        return res.json({ userId: user.data.id });
    }

    public static async onRent(req: IMyRequest, res: express.Response)
    {
        const data = req.body;

        if (!data.login || !data.password || !data.carId || !data.from || !data.to) {
            return res.json(new Requisite().code(202).error("Wrong data sent.").toJSON());
        }

        const user = await User.GetByName(data.login);
        if (!user.result || user.data.password !== data.password) {
            return res.json(new Requisite().code(201).error("Wrong login or password.").toJSON());
        }

        const car = await Car.GetById(data.carId);

        if (!car.result) {
            return res.json(new Requisite().code(203).error("No such car.").toJSON());
        }

        const from = new Date(data.from);
        const to = new Date(data.to);

        const available = await CarOrder.GetOrdersForCarWithinTimeframe(car.data.id, from, to);

        if (available.length) {
            return res.json(new Requisite().code(204).error("Car is not available for rent.").toJSON());
        }

        const order = await CarOrder.Create(car.data.id, from, to, user.data.id);

        return res.json(new Requisite(order));
    }
}
