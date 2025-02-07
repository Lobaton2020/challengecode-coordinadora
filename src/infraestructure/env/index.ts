import { IEnv } from "../common/interfaces/IEnv";

export const ENV: IEnv = {
  PORT: parseInt(process.env.PORT ?? "8080"),
  DOMAIN: process.env.DOMAIN ?? "",
  SERVICE_NAME: process.env.SERVICE_NAME ?? "",

  PG_HOST: process.env.PG_HOST ?? "",
  PG_PORT: parseInt(process.env.PG_PORT ?? "5432"),
  PG_DATABASE: process.env.PG_DATABASE ?? "",
  PG_USER: process.env.PG_USER ?? "",
  PG_PASSWORD: process.env.PG_PASSWORD ?? "",

  REDIS_HOST: process.env.REDIS_HOST ?? "",
  REDIS_PORT: parseInt(process.env.REDIS_PORT ?? "00"),
  REDIS_USER: process.env.REDIS_USER ?? "",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? "",
};