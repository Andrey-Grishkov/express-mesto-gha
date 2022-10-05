const { celebrate, Joi } = require('celebrate');
const {login, createUser} = require('../controllers/users');
const urlPattern = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;
const router = require('express').Router();

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().regex(urlPattern),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// {
//   "name":"notix",
//   "about":"pork hinter",
//   "avatar":"https://www.sunhome.ru/i/wallpapers/73/krasnoe-selo.orig.jpg",
//   "email":"yandexnotix@mail.ru",
//   "password":"Asol245"
// }


router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNkMzFlMzcyM2ZjMmVhYmFjYWUxYmMiLCJpYXQiOjE2NjQ5NTc0NDIsImV4cCI6MTY2NTU2MjI0Mn0.hIHvS7WB4gaNBK7zZEguEZ-R725DhQnaL_J28BugSRE"

module.exports = router;
