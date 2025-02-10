export interface IEnv {
  PORT: number;
  DOMAIN: string;
  SERVICE_NAME: string;

  PG_HOST: string;
  PG_PORT: number;
  PG_DATABASE: string;
  PG_USER: string;
  PG_PASSWORD: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USER: string;
  REDIS_PASSWORD: string;

  SECRET_KEY_JWT: string;
  EXP_HOURS_JWT: string;
  EXP_HOURS_CACHE_MAESTROS: number;
}
