import * as express from "express";
import { body, param, query, validationResult } from "express-validator";
import * as bodyParser from "body-parser";
import { Config } from "config";
import { IMyRequest, WebClientUtil } from "../WebClientUtil";
import { CarOrder } from "entities/CarOrder";

export class WebPrintRouter
{
  public static GetRouter()
  {
    const router = express.Router();

    router.get("/order/:id", this.onPrintOrder);

    return router;
  }

  public static async onPrintOrder(req: IMyRequest, res: express.Response)
  {
    const id = Number.parseInt(req.params.id, 10);
    const r = await CarOrder.GetById(id);
    console.log(r);
    res.render("order", r);
  }
}
