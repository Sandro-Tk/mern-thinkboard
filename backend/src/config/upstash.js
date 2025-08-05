const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
const dotenv = require("dotenv");

dotenv.config();

// create a ratelimiter that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
});

module.exports = ratelimit;
