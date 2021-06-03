export class Requisite<T = null> {
    public _code: number = 1;
    public data: T | undefined = undefined;
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
            result: this.result,
        });
    }

    public fromJSON(json: string)
    {
        const temp = JSON.parse(json);
        return this.parse(temp);
    }

    public parse(temp: any)
    {
        this.message = temp.error && temp.error.message || this.message;
        this.data = temp.data || null;
        this._code = temp.error && temp.error.code;
        this.result = (temp.result !== undefined) ? temp.result : true;
        return this;
    }
}