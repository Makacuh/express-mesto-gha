const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const validator = require('validator');
const AuthorizationError = require('../errors/authorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Значение должно быть не меньше 2, у вас {VALUE}'],
    maxlength: [30, 'Значение должно быть не больше 30, у вас {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Значение должно быть не меньше 2, у вас {VALUE}'],
    maxlength: [30, 'Значение должно быть не больше 30, у вас {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    minlength: 2,
    validate: {
      validator: (link) => {
        validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
    },
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Пользователь не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Пользователь не найден');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
