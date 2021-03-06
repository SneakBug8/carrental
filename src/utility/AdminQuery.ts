import knex from "knex";
import { isArray } from "util";

interface IAdminQuery
{
  from?: number;
  to?: number;
  sortby?: string;
  sortway?: string;
}

export function ParseAdminQuery(input: any)
{
  const res: IAdminQuery = {};
  if (input.range) {
    const range = JSON.parse(input.range);
    if (range.length === 2) {
      res.from = range[0];
      res.to = range[1];
    }
  }

  if (input.sort) {
    const sort = JSON.parse(input.sort);
    const sortvalue = sort[0][0].toUpperCase() + (sort[0] as string).substring(1);
    res.sortby = sortvalue;
    res.sortway = sort[1];
  }

  return res;
}

export function ConvertAdminQuery(input: any, query: any)
{
  if (input.range) {
    const range = JSON.parse(input.range);
    if (range.length === 2) {
      const amount = range[1] - range[0];
      query.offset(range[0]);
      query.limit(amount);
      /* query.where("Id", ">", range[0]);
      query.where("Id", "<", range[1]); */
    }
  }
  if (input.filter) {
    const obj = JSON.parse(input.filter);

    if (Object.keys(obj).length > 0) {
      const filters = Object.entries(obj);

      for (const filter of filters) {
        const key = filter[0][0].toUpperCase() + (filter[0] as string).substring(1);

        if (isArray(filter[1])) {
          for (const value of filter[1]) {
            query = query.orWhere(key, value);
          }
        }
        else {
          query = query.orWhere(key, filter[1]);
        }
      }
    }
  }
  if (input.sort) {
    const sort = JSON.parse(input.sort);
    const sortvalue = sort[0][0].toUpperCase() + (sort[0] as string).substring(1);

    query.orderBy(sortvalue, sort[1]);
  }
  return query;
}