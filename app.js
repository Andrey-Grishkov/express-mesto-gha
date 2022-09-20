const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Ошибка 404: Страница отсутствует' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`);
});
