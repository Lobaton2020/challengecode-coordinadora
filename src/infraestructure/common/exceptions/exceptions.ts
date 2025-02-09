import { HttpCode } from "../enum/HttpCode";

export class Exception extends Error {
  is_error: boolean = true;
  reference: string = this.name;
  code: number = 500;
  cause?: string;
  customError = true;

  constructor(message: string, code: number, cause?: string) {
    super(message);
    this.message = message;
    this.code = code;
    this.cause = cause ?? message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }
  }
}

export class DbException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.SERVER_ERROR, cause);
  }
}
export class CacheException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.SERVER_ERROR, cause);
  }
}

export class ValidationException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.BAD_REQUEST, cause);
  }
}

export class BadRequestException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.BAD_REQUEST, cause);
  }
}

export class UnathorizedException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.UNAUTHORIZED, cause);
  }
}

export class ForbiddenException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.FORBIDDEN, cause);
  }
}

export class NotFoundException extends Exception {
  constructor(message: string, cause?: string) {
    super(message, HttpCode.NOT_FOUND, cause);
  }
}
