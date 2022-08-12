const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не менее 2, у вас  {VALUE}'],
    maxlength: [30, 'Должно быть не менее 2, у вас  {VALUE}'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не менее 2, у вас  {VALUE}'],
    maxlength: [30, 'Должно быть не менее 2, у вас  {VALUE}'],
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'требуется ввести почту'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'требуется ввести пароль'],
    select: false,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
