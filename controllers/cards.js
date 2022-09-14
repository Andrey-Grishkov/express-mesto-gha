const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card === null || undefined) {
        return res
          .status(404)
          .send({ message: 'Ошибка 404: Карточка не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: id карточки отсутствует' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) {
      return res
        .status(404)
        .send({ message: 'Ошибка 404: Карточка не найдена' });
    }
    return res.send({ data: card });
  }).catch((err) => {
    if (err.name === 'CastError') {
      return res
        .status(400)
        .send({ message: 'Ошибка 400: Некорректный id карточки' });
    }
    return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
  });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) {
      return res
        .status(404)
        .send({ message: 'Ошибка 404: Карточка не найдена' });
    }
    return res.status(200).send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Ошибка 400: Некорректный id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' });
    });
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
