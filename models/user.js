const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('user', userSchema);
