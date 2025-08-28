const { createClient } = require('redis');

const redisOptions = process.env.REDIS_URL
  ? { url: process.env.REDIS_URL }
  : {}; // defaults to redis://localhost:6379

const redisClient = createClient(redisOptions);

redisClient.connect()
  .then(() => console.log('✅ Redis connected'))
  .catch(err => console.error('❌ Redis connection failed:', err.message));

module.exports = redisClient;

