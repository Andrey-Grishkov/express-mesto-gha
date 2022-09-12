const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
        res.send({ data: card })
      }
    )
    .catch(() => res.status(500).send({message:'Ошибка 500: Что-то пошло не так'}));
};

module.exports = {
  getCards
}
