const redis = require("redis");
const RedisStore = require("connect-redis").default;

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});

(async () => {
  await redisClient.connect();
})();
redisClient.on("connect", () => {
  console.log("Redis Connected.");
});

module.exports = { redisClient, RedisStore };
