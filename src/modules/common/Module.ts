import {
  DEPENDENCIES_INJECTION,
  createDependendencies,
} from "./dependencies/Dependencies";
import { HttpMethod } from "./domain/enum/HttpMethod";
import { GraphQL, IModule } from "./domain/repositories/IModule";
import { IRoute } from "./domain/repositories/IRoute";
export class CommonModule implements IModule {
  getGraphQL(): GraphQL {
    return {};
  }
  prefix = "/";
  public init() {
    createDependendencies(DEPENDENCIES_INJECTION);
  }
  public getRoutes(): IRoute[] {
    return [
      {
        path: "healthcheck",
        handler: () => ({ ok: "ok" }),
        method: HttpMethod.GET,
      },
    ];
  }
}
