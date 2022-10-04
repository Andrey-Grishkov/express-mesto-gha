const { err401 } = require('../utils/errorsCodes');

class UnauthorizedError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.status = err401;
  }
}

module.exports = UnauthorizedError;
