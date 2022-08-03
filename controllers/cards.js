const Card = require('../models/card');
const { errorMessage } = require('../utils/customErrors');
const { CREATED, NOT_FOUND } = require('../utils/statuses');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const findCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Несуществующий _id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Несуществующий _id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

module.exports = {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
};