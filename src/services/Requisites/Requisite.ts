import { Result } from "express-validator";

export class Requisite<T = null> {
    private _code: number = 1;
    public data: T;
    public result: boolean = false;
    public message: string = "";

    public error(msg: string)
    {
        this.result = false;
        this.message = msg;
        return this;
    }

    public to<V>() {
        return new Requisite<V>().error(this.message);
    }

    public success(data?: T | string)
    {
        if (typeof data === "boolean") {
            this.message = "Success";
        }
        else if (typeof data === "string") {
            this.message = data;
        }
        else {
            this.data = data;
        }
        this.result = true;
        return this;
    }

    public constructor(data?: T | string)
    {
        this.success(data);
    }

    public toString() {
        return `Requisite(${this.result}): ${this.message}`;
    }

    public code(code: number) {
        this._code = code;
        return this;
    }

    public toJSON()
    {
        return JSON.stringify({
            error: {
                code: this._code,
                message: this.message,
            },
            data: this.data,
        });
    }

    public fromJSON(json: string)
    {
        const temp = JSON.parse(json);
        this.message = temp.error.message || this.message;
        this.data = temp.data || null;
        this._code = temp.code || this._code;
        return this;
    }
}