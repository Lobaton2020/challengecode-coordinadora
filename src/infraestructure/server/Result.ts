import { HttpCode } from "../common/enum/HttpCode";

export class Response{
    constructor(
        public statusCode: number,
        public response: {
            isError: boolean,
            data?: any
        }
    ){}
    getJson(){
        return this.response
    }
    getStatusCode(){
        return this.statusCode;
    }
}
export class Result{
    static ok(data?: any): Response{
        return new Response(HttpCode.OK, {
            isError: false,
            data
        })
    }
    static custom(statusCode: number, isError: boolean, data?: any): Response{
        return new Response(statusCode, {
            isError,
            data
        })
    }
    static bad(data?: any): Response{
        return new Response(HttpCode.BAD_REQUEST, {
            isError: true,
            data
        })
    }
    static error(data?: any): Response{
        return new Response(HttpCode.SERVER_ERROR, {
            isError: true,
            data
        })
    }
}