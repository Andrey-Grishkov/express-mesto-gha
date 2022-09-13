const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card
      ) => {
        res.send({ data: card })
      }
    )
    .catch(() => res.status(500).send({message:'Ошибка 500: Что-то пошло не так'}));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId= req.user._id;

  console.log(req.user._id);

  console.log(req.body);

  Card.create({ name, link, owner: userId })
    .then((card
    ) => {
      console.log({data: card});
        res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err.name)
        return res
          .status(400)
          .send({message:'Ошибка 400: Переданы некорректные данные'});
      }
      return res.status(500).send({message:'Ошибка 500: Что-то пошло не так'});
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) {
        return res
          .status(404)
          .send({message:'Ошибка 404: Карточка не найдена'});
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({message:'Ошибка 500: Что-то пошло не так'}));
};


module.exports = {
  getCards, createCard, deleteCardById
}
