import { jquery } from "..";

export function setupDatepickers()
{
    (jquery(".datepicker") as any).datepicker();
}