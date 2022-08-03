const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('./statuses');

module.exports.errorMessage = (err, req, res) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({
      message: 'Некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({
      message: 'Данные по указанному _id не найдены',
    });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({
    message: 'Внутренняя ошибка сервера',
  });
};
