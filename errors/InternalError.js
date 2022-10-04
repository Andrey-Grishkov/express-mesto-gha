const { err500 } = require('../utils/errorsCodes');

class InternalError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = err500;
  }
}

module.exports = InternalError;
