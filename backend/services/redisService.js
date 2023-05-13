const client = require("../config/redis").redisClient;

class RedisService {
  constructor(client) {
    this.client = client;
  }

  async checkCache(key) {
    if (await this.client.get(key)) return true;
    else return false;
  }

  async cacheData(key, data) {
    await this.client.set(key, JSON.stringify(data));
  }

  async getCachedData(key) {
    return JSON.parse(await this.client.get(key));
  }
}

module.exports = new RedisService(client);
