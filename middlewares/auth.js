const err401 = require('../utils/errorsCodes');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, 'top-secret');
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload;

  next();
  return null;
};
