const routerCards = require('express').Router();

const {
  getCards, createCard, deleteCardById
} = require('../controllers/cards');

routerCards.get('/', getCards);
routerCards.delete('/:cardId', deleteCardById);
routerCards.post('/', createCard);

module.exports = routerCards;
