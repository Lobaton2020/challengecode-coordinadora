import { injectable } from "inversify";
import { Redis } from "ioredis";
import { CommonTypes } from "../../../modules/common/dependencies/Types";
import { CacheRepository } from "../../../modules/auth/domain/repositories/CacheRepository";
import { DEPENDENCIES_INJECTION } from "../../../modules/common/dependencies/Dependencies";
import { CacheException } from "../../common/exceptions/exceptions";

@injectable()
export class CacheDao implements CacheRepository
 {
  private redis = DEPENDENCIES_INJECTION.get<Redis>(CommonTypes.Cache);
  async get<T>(key: string): Promise<T | null> {
    try {
      const lista = await this.redis.get(key);
      if (!lista) {
        return null;
      }
      return JSON.parse(lista);
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async set<T = any>(key: string, data: T): Promise<void> {
    try {
      await this.redis.set(key, JSON.stringify(data));
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async setEx<T = any>(key: string, seconds: number, data: T): Promise<void> {
    try {
      await this.redis.setex(key, seconds, JSON.stringify(data));
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async remove(keys: string[]): Promise<void> {
    try {
      await this.redis.del(...keys);
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async hDel(collection: string, key: string): Promise<void> {
    try {
      await this.redis.hdel(collection, key);
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async hGet(collection: string, key: string): Promise<string | null> {
    try {
      return await this.redis.hget(collection, key);
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async hSet(collection: string, key: string, data: string): Promise<void> {
    try {
      await this.redis.hset(collection, key, data);
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }
  async hSetAllEx(
    collection: string,
    data: Record<string, string>,
    exp: number
  ): Promise<void> {
    try {
      const entries = Object.entries(data).flat();
      await this.redis.hmset(collection, ...entries);
      await this.redis.expire(collection, exp);
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }

  async hGetAll<T>(collection: string): Promise<T | null> {
    try {
      const data = await this.redis.hgetall(collection);
      if (Object.keys(data ?? {}).length === 0) {
        return null;
      }
      return data as T;
    } catch (error: any) {
      console.log(error);
      throw new CacheException(error.message);
    }
  }
}
