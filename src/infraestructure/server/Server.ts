import express, { NextFunction } from "express";
import { Request, Response } from "express";
import * as http from "http";
import { Response as CustomReponse } from "./Result";
import { DEPENDENCIES_INJECTION } from "../../modules/common/dependencies/Dependencies";
import { ILogger } from "../../modules/common/domain/repositories/ILogger";
import { CommonTypes } from "../../modules/common/dependencies/Types";
import { IContext } from "../../modules/common/domain/repositories/IPayload";
import { IModule } from "../../modules/common/domain/repositories/IModule";
import { ENV } from "../env";
import { IServer } from "../../modules/common/domain/repositories/IServer";
import { swaggerDocument } from "./swagger/swaggerDocument";
import { convertFastifySchemaToSwagger } from "./swagger/convertToSwaggerDoc";
import cors from "cors";
import swaggerUi from "swagger-ui-express";


export class Server implements IServer {
  private logger = DEPENDENCIES_INJECTION.get<ILogger>(CommonTypes.Logger);
  private _app: express.Application;
  private _server: http.Server;
  public _prefix: string = `/${ENV.DOMAIN}/${ENV.SERVICE_NAME}/api/v1`;
  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(cors());
    this.configureRoutes();
    this.configSwagger();
  }

  private configSwagger() {
    let paths = convertFastifySchemaToSwagger(swaggerDocument);
    paths = Object.fromEntries(
      Object.entries(paths).map(([k, v]) => [`${this._prefix}${k}`, v])
    );
    this.logger.log("***** Defincion endpoints ✈️✈️  **** ");
    Object.entries(paths).forEach(([url, methods]) => {
      Object.keys(methods ?? []).forEach((m) => {
        this.logger.log(`${m?.toUpperCase()} ${url}`);
      });
    });
    this.logger.log(`GET ${this._prefix}/docs`);
    this.logger.log("************************************ ");
    this._app.use(
      `${this._prefix}/docs`,
      swaggerUi.serve,
      swaggerUi.setup({
        openapi: "3.0.0",
        info: {
          title: "Coordinadora challenge Api Documentacion",
          version: "1.0.0",
          description: "API documentation for my microservice",
        },
        paths,
      })
    );
  }
  preHandlerGeneric(callback: Function) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const payload: IContext = {
          body: req.body,
          params: req.params,
          query: req.query,
          headers: req.headers,
        };
        let calledFn = callback(payload);
        if (calledFn instanceof Promise) {
          calledFn = await calledFn;
        }
        if (calledFn === null || calledFn === undefined) {
          res.sendStatus(204);
          return;
        }
        if (typeof calledFn === "object" && calledFn instanceof CustomReponse) {
          res.status(calledFn.getStatusCode()).json(calledFn.getJson());
          return;
        }
        if (typeof calledFn === "object") {
          res.json(calledFn);
          return;
        }
        res.send(calledFn);
        return;
      } catch (err) {
        if (typeof err === "object" && err instanceof CustomReponse) {
          res.status(err.getStatusCode()).json(err.getJson());
          return;
        }
        next(err);
      }
    };
  }
  addModules(modules: IModule[]): void {
    modules.forEach((_module) => {
      _module.init();
      const router = express.Router() as any;
      _module.getRoutes().forEach((route) => {
        const { validation, path, method, handler } = route;
        route.validation = Array.isArray(validation) ? validation : [];
        const _path = `${this._prefix}${_module.prefix}${path}`;
        router[method.toLowerCase()](
          _path,
          ...route.validation,
          this.preHandlerGeneric(handler)
        );
      });
      router.use(this.globarErrorHandler());
      this._app.use(router);
    });
  }
  globarErrorHandler() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
      this.logger.log(`ERROR: ${err.message}`);
      if (err && err.error && err.error.isJoi) {
        return res.status(400).json({
          isError: true,
          data: err,
        });
      }
      if(err?.customError){
        return res.status(err?.code).json({
          is_error: true,
          message: err.message,
          cause: err.cause
        });
      }
      return res.status(500).json({
        is_error: true,
        data: err.message,
      });
    };
  }
  private configureRoutes(): void {
    this._app.use(this.globarErrorHandler());
  }

  public startServer(port: string): void {
    this._server = this._app.listen(port, () => {
      this.logger.log(`Server listening on port ${port}`);
    });
  }
  get server() {
    return this._server;
  }
  get app() {
    return this._app;
  }
}
