const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//
//   if (!token) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }
//
//   let payload;
//
//   try {
//     payload = jwt.verify(token, 'top-secret');
//   } catch (err) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }
//
//   req.user = payload;
//
//   next();
//   return null;
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'top-secret');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
  return null;
};
