import pgPromise, { IDatabase, IMain } from "pg-promise";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset";
import { ENV } from "../../env";

const config: IConnectionParameters = {
  host: ENV.PG_HOST,
  port: ENV.PG_PORT,
  database: ENV.PG_DATABASE,
  user: ENV.PG_USER,
  password: ENV.PG_PASSWORD,
  max: 30,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  query_timeout: 1000,
  //TODO: Validar esta parte de seguridad
  ssl: ['postgres', 'localhost', '34.58.195.97'].includes(ENV.PG_HOST) ? false : { rejectUnauthorized: false },
};
const pgp: IMain = pgPromise({});
export const db = pgp(config) as IDatabase<IMain>;
