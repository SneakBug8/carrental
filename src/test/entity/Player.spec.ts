import * as assert from "assert";
import "mocha";
import { Player } from "entities/example";

let lastid = 1;

describe("PlayerTests", () =>
{
    it("Exists", async () =>
    {
        assert.ok(! await Player.Exists(999), "Exists function works properly");
    });
});