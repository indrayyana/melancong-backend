const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  limit: 20, // maksimal 20 permintaan dalam 15 menit
  skipSuccessfulRequests: true, // hanya hitung permintaan yang gagal
});

module.exports = {
  authLimiter,
};
