const { err404 } = require('../utils/errorsCodes');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = err404;
  }
}

module.exports = NotFoundError;
