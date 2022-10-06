
const UnauthorizedError = require('../errors/UnauthorizedError');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'top-secret');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};















// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//
//   if (!token) {
//     throw new UnauthorizedError();
//   }
//
//   let payload;
//
//   try {
//     payload = jwt.verify(token, 'top-secret');
//   } catch (err) {
//     throw new UnauthorizedError();
//   }
//
//   req.user = payload;
//
//   next();
//   return null;
// };

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnauthorizedError();
//   }
//
//   const token = authorization.replace('Bearer ', '');
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

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//
//   if (!token) {
//     throw new UnauthorizedError();
//   }
//
//   let payload;
//
//   try {
//     payload = jwt.verify(token, 'top-secret');
//   } catch (err) {
//     throw new UnauthorizedError();
//   }
//
//   req.user = payload;
//
//   next();
//   return null;
// };
