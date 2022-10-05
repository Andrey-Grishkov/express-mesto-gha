const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const validator = require('validator');
const { errors } = require('celebrate');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const router = require('express').Router();
const userSign = require('./routes/userSign');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},);

app.use('/', userSign);

// app.use(cookieParser());
app.use(auth);

app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404: Страница отсутствует'));
});
app.use(errors());

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`);
});
