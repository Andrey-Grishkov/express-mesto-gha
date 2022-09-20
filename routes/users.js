const routerUsers = require('express').Router();

const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.patch('/me', updateUserProfile);
routerUsers.get('/me', getUserInfo);
routerUsers.patch('/me/avatar', updateUserAvatar);

module.exports = routerUsers;
