const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology:true,
});

const { PORT = 3000 } = process.env;

const app = express();

// app.use(bodyParser.json);
//
app.use('/users', routerUsers);


app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`)
});



