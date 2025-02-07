export interface CacheRepository {
  get<T>(key: string): Promise<T | null>;
  set<T = any>(key: string, data: T): Promise<void>;
  setEx<T = any>(key: string, expireIn: number, data: T): Promise<void>;
  remove(key: string[]): Promise<void>;
  hDel(collection: string, key: string): Promise<void>;
  hGet(collection: string, key: string): Promise<string | null>;
  hGetAll<T>(collection: string): Promise<T | null>;
  hSet(collection: string, key: string, data: string): Promise<void>;
  hSetAllEx(
    collection: string,
    data: Record<string, string>,
    exp: number
  ): Promise<void>;
}
