const { rateLimit } = require('express-rate-limit');

module.exports = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
});
