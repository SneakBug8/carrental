import { Logger } from "utility/Logger";

export class FactoryManagementService
{
    public static async Run()
    {
        Logger.info("Ran Factory management service");
    }

    public static Lerp(start: number, end: number, percent: number)
    {
        return (start + percent * (end - start));
    }
}
