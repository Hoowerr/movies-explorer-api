require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_PATH: process.env.MONGODB_PATH || 'mongodb://127.0.0.1:27017/bitfilmsdb',
};
