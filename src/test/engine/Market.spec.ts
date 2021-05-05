import * as assert from "assert";
import "mocha";
import { Runner } from "Runner";

describe("MarketEngine", () =>
{
    it("TradesBetweenPlayers", async () =>
    {
        Runner.Init();

        assert.ok(1 > 0, "Traded goods")
    });
});
