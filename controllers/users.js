const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  err500, err400, err404, ok200,
} = require('../utils/errorsCodes');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};







const getUsers = (req, res) => {
  User.find({})
    .then((user) => { res.send({ data: user }); })
    .catch(() => res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(err404)
          .send({ message: 'Ошибка 404: Пользователь не найден' });
      }
      return res.status(ok200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password, } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
User.create({ name, about, avatar, email, password, })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(err404)
          .send({ message: 'Ошибка 404: Пользователь не найден' });
      }
      return res.status(ok200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(err404)
          .send({ message: 'Ошибка 404: Пользователь не найден' });
      }
      return res.status(ok200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
      }
      res.send({ message: user });
    })
    .catch(next);
};

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar, login, getUserInfo,
};
