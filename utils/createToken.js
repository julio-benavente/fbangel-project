const jwt = require("jsonwebtoken");

const createToken = (data, expiresIn, tokenKey = process.env.JWT_KEY) => {
  const token = jwt.sign({ data: data }, tokenKey, { expiresIn });

  return token;
};

module.exports = { createToken };
