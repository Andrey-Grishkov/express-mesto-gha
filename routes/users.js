const routerUsers = require('express').Router();

const {
  getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.post('/', createUser);
routerUsers.patch('/me', updateUserProfile);
routerUsers.patch('/me/avatar', updateUserAvatar);

module.exports = routerUsers;
