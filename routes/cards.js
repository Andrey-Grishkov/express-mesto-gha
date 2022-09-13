const routerCards = require('express').Router();

const {
  getCards, createCard
} = require('../controllers/cards');

routerCards.get('/', getCards);
// routerCards.delete('/:cardId', getCardById);
routerCards.post('/', createCard);

module.exports = routerCards;
