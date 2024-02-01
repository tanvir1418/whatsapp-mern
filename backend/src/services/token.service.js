const { sign } = require("../utils/token.util");

const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

module.exports = { generateToken };
