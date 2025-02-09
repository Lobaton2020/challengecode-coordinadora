import { HttpMethod } from "../enum/HttpMethod";

export interface IRoute{
    path: string,
    handler: Function,
    method: HttpMethod,
    validation?: any[]
    middlewares?: Function[]
}