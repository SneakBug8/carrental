import { TypedEvent } from "./TypedEvent";
import { ITradeEvent } from "./types/example";

export const EventsList = {
    //onRGOGain: new TypedEvent<RGOGainEvent>(),
    beforeMarket: new TypedEvent<void>(),
    afterMarket: new TypedEvent<void>(),
    onTrade: new TypedEvent<ITradeEvent>(),
};
