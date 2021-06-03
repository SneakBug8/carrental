import * as express from "express";
import { body, param, query, validationResult } from "express-validator";
import * as bodyParser from "body-parser";
import { Config } from "config";
import { IMyRequest, WebClientUtil } from "../WebClientUtil";
import { CarOrder } from "entities/CarOrder";
import { Car } from "entities/Car";
import { User } from "entities/User";
import { CarModel } from "entities/CarModel";
import { Requisite } from "services/Requisites/Requisite";

export class WebPrintRouter
{
  public static GetRouter()
  {
    const router = express.Router();

    router.get("/order/:id", this.onPrintOrder);

    router.all(new RegExp(".*"), this.on404);

    return router;
  }

  public static on404(req: IMyRequest, res: express.Response)
  {
    res.json(new Requisite().code(404).error("Not found").toJSON());
    // WebClientUtil.render(req, res, "register", {}, false);
  }

  public static async onPrintOrder(req: IMyRequest, res: express.Response)
  {
    const id = Number.parseInt(req.params.id, 10);
    const r = await CarOrder.GetById(id);
    const c = (await Car.GetById(r.carId)).data;
    const cu = (await User.GetById(r.customerId)).data;
    const cm = await CarModel.GetById(c.modelId);

    const from = r.from.toDateString();
    const to = r.to.toDateString();

    res.render("order", {
      order: r,
      car: c,
      customer: cu,
      model: cm,
      from,
      to,
      layout: null,
    });
  }
}
