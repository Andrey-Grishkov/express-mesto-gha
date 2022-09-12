const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology:true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  req.user = {
    _id: '631f96f4dad6cbda676962c2'
  };

  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`)
});



