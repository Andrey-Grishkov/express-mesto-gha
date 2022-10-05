const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const validator = require('validator');
const { errors, celebrate, Joi } = require('celebrate');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const router = require('express').Router();
const patternUrl = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth);


router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(patternUrl),
  }),
}), createUser);


// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   }),
// }), login);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().uri().custom((value, helper) => {
//       if (validator.isURL(value)) {
//         return value;
//       }
//       return helper.message('Невалидный URL');
//     }),
//   }),
// }), createUser);
// app.use('/users', auth, routerUsers);
// app.use('/cards', auth, routerCards);


app.use(errors());
// app.use(errorHandler);
app.use((req, res, next) => {
  next(new NotFoundError('Ошибка 404: Страница отсутствует'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`);
});
