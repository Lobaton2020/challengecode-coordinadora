import { HttpCode } from "../common/enum/HttpCode";

export class Response {
  constructor(
    public statusCode: number,
    public response: {
      is_error: boolean;
      data?: any;
    }
  ) {}
  getJson() {
    return this.response;
  }
  getStatusCode() {
    return this.statusCode;
  }
}
export class Result {
  static ok(data?: any): Response {
    return new Response(HttpCode.OK, {
      is_error: false,
      data,
    });
  }
  static custom(statusCode: number, is_error: boolean, data?: any): Response {
    return new Response(statusCode, {
      is_error,
      data,
    });
  }
  static bad(data?: any): Response {
    return new Response(HttpCode.BAD_REQUEST, {
      is_error: true,
      data,
    });
  }
  static error(data?: any): Response {
    return new Response(HttpCode.SERVER_ERROR, {
      is_error: true,
      data,
    });
  }
}