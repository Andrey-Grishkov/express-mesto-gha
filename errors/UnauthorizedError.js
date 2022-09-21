const { err401 } = require('../utils/errorsCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = err401;
  }
}

module.exports = {
  UnauthorizedError,
};
