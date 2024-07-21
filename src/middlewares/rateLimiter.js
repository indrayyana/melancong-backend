import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // A maximum of 20 requests within 15 minutes
  skipSuccessfulRequests: true, // only count failed requests
});
