import knex from "knex";

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
      query.where("Id", ">", range[0]);
      query.where("Id", "<", range[1]);
    }
  }
  if (input.sort) {
    const sort = JSON.parse(input.sort);
    const sortvalue = sort[0][0].toUpperCase() + (sort[0] as string).substring(1);

    query.orderBy(sortvalue, sort[1]);
  }
  return query;
}