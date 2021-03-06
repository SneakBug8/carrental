import { CarOrder } from "entities/CarOrder";

export class CarOrdersService
{
  public static async ProcessReactQuery(input: any)
  {
    let query = CarOrder.Select();
    query = this.ConvertReactQuery(input, query);
    return CarOrder.UseQuery(await query);
  }

  public static ConvertReactQuery(input: any, query: any)
  {
    if (input.date) {
      const date = JSON.parse(input.date);
      if (date.length === 2) {
        query = query.where("From", ">", date[0]);
        query = query.andWhere("To", "<", date[1]);
      }
    }
    return query;
  }
}
