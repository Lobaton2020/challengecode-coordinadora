import { IRoute } from "./IRoute";

export interface GraphQL {
  [symbol: symbol]: object;
}
export interface IModule {
  prefix: string;
  getRoutes(): IRoute[];
  init(): void;
}