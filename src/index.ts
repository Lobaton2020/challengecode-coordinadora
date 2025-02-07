import { bootstrap } from "./app";
import { DEPENDENCIES_INJECTION } from "./modules/common/dependencies/Dependencies";
import { CommonTypes } from "./modules/common/dependencies/Types";
import { ILogger } from "./modules/common/domain/repositories/ILogger";
import { IServer } from "./modules/common/domain/repositories/IServer";

const logger = DEPENDENCIES_INJECTION.get<ILogger>(CommonTypes.Logger);

Promise.resolve(bootstrap())
  .then((server) => server.startServer(process.env.PORT ?? "3001"))
  .catch((err) => {
    logger.log(err);
    process.exit(1);
  });
