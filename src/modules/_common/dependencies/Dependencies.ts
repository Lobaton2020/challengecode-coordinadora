import { Container } from "inversify";
import { ILogger } from "../domain/repositories/ILogger";
import { CommonTypes } from "./Types";
import { httpClient } from "../../../infraestructure/api/adapter/Config";
import { AxiosInstance } from "axios";
import { db } from "../../../infraestructure/bd/adapter/adapter";
import { LoggerWinston } from "../../../infraestructure/logger/logger";
import { cache } from "../../../infraestructure/cache/adapter/adapter";
import { CacheDao } from "../../../infraestructure/cache/dao/CacheDao";
import { CacheRepository } from "../domain/repositories/CacheRepository";

export const DEPENDENCIES_INJECTION = new Container();
DEPENDENCIES_INJECTION.bind<ILogger>(CommonTypes.Logger)
  .to(LoggerWinston)
  .inSingletonScope();

export const createDependendencies = (_DEPENDENCIES_INJECTION: Container) => {
  _DEPENDENCIES_INJECTION
    .bind<AxiosInstance>(CommonTypes.HttpClient)
    .toConstantValue(httpClient);
  _DEPENDENCIES_INJECTION.bind(CommonTypes.Bd).toConstantValue(db);
  _DEPENDENCIES_INJECTION.bind(CommonTypes.Cache).toConstantValue(cache);
  DEPENDENCIES_INJECTION.bind<CacheRepository>(CommonTypes.CacheRepository)
    .to(CacheDao)
    .inSingletonScope();
};