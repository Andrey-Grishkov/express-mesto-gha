const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => { res.send({ data: user }); })
    .catch(() => res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' }));
};

const getUserById = (req, res) => {
  User.findById(req.params)
    .then((user) => {
      if (user === null) {
        return res
          .status(404)
          .send({ message: 'Ошибка 404: Пользователь не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: Некорректный id пользователя' });
      } if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Ошибка 404: id пользователя отсутствует' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
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
      if (user === null) {
        return res
          .status(404)
          .send({ message: 'Ошибка 404: Пользователь не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
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
      if (user === null) {
        return res
          .status(404)
          .send({ message: 'Ошибка 404: Пользователь не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar,
};
