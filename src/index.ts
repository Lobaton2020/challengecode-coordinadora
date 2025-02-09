import { bootstrap } from "./app";
import { DEPENDENCIES_INJECTION } from "./modules/_common/dependencies/Dependencies";
import { CommonTypes } from "./modules/_common/dependencies/Types";
import { ILogger } from "./modules/_common/domain/repositories/ILogger";

const logger = DEPENDENCIES_INJECTION.get<ILogger>(CommonTypes.Logger);

Promise.resolve(bootstrap())
  .then((server) => server.startServer(process.env.PORT ?? "3001"))
  .catch((err) => {
    logger.log(err);
    process.exit(1);
  });
