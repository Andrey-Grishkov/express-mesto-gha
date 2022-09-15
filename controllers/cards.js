const Card = require('../models/card');
const {
  err500, err400, err404, ok200,
} = require('../utils/errorsCodes');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(err404)
          .send({ message: 'Ошибка 404: Карточка не найдена' });
      }
      return res.status(ok200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Некорректный id карточки' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res
        .status(err404)
        .send({ message: 'Ошибка 404: Карточка не найдена' });
    }
    return res.send({ data: card });
  }).catch((err) => {
    if (err.name === 'CastError') {
      return res
        .status(err400)
        .send({ message: 'Ошибка 400: Некорректный id карточки' });
    }
    return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
  });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return res
        .status(err404)
        .send({ message: 'Ошибка 404: Карточка не найдена' });
    }
    return res.status(ok200).send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(err400)
          .send({ message: 'Ошибка 400: Некорректный id карточки' });
      }
      return res.status(err500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
