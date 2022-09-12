const routerUsers = require('express').Router();

const {
  getUsers,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
// router.post('/', createUser);

module.exports = routerUsers;
