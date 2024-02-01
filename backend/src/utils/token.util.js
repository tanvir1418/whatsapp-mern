const jwt = require("jsonwebtoken");
const logger = require("../configs/logger.config");

const sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: expiresIn }, (error, token) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { sign };
