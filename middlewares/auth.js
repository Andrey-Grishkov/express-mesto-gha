const err401 = require('../utils/errorsCodes');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    res
      .status(err401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
  return null;
};
