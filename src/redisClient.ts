import * as redis from 'redis';

let singleton = null;

export interface IRedisClient {
  _getAync(key: string): Promise<string>;
  _setAsync(key: string, value: string): Promise<unknown | null>;
  start(host: string, port: number): Promise<IRedisClient>;
  stop(): Promise<unknown | null>;
  getJSON(key: string): Promise<object>;
  setJSON(key: string, value: object): Promise<unknown>;
}

class RedisClient implements IRedisClient {
  private client: redis.RedisClient = null;

  static getSingleton() {
    if (!singleton) {
      singleton = new RedisClient();
    }

    return singleton;
  }

  async _getAync(key: string) {
    return new Promise<string | null>((accept, reject) => {
      this.client.get(key, (error: Error, reply: string | null) => {
        if (error) {
          return reject(error);
        }

        return accept(reply);
      });
    });
  }

  async _setAsync(key: string, value: string) {
    return await new Promise<null>((accept, reject) => {
      this.client.set(key, value, error => {
        if (error) {
          return reject(error);
        }

        return accept(null);
      });
    });
  }

  async start(host: string, port: number) {
    this.client = redis.createClient({ host, port });
    const expected = 'OK';
    await this._setAsync('health', expected);
    const reply = await this._getAync('health');

    if (reply !== expected) {
      throw new Error('Could not initialize redis!');
    }

    return this;
  }

  async stop() {
    return await new Promise<null>((accept, reject) => {
      this.client.quit((error: Error) => {
        if (error) {
          return reject(error);
        }

        return accept(null);
      });
    });
  }

  async getJSON(key: string) {
    return JSON.parse(await this._getAync(key));
  }

  async setJSON(key: string, value: object) {
    return await this._setAsync(key, JSON.stringify(value));
  }
}

export default new RedisClient();
