const ratelimit = require("../config/upstash");

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests! Please try again later",
            });
        }

        next();
    } catch (err) {
        console.log("rate limit error", err);
        next(err);
    }
};

module.exports = rateLimiter;
