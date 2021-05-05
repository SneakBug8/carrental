export class ITradeEvent {
    public Type: TradeEventType;
    public Amount: number;
    public Price: number;
}

export enum TradeEventType {
    ToPlayer,
    FromPlayer,
    ToGovernment,
    FromGovernment,
}
