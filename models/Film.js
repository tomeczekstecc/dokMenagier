const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Pole Tytuł jest wymagane'],
    trim: true,
  },
  type: {
    type: String,
    default: 'film',
  },
  target: {
    type: String,
    default: 'ben',
    enum: ['ben', 'oper'],
  },
  linkYT: {
    type: String,
    required: [true, 'Pole link filmu jest wymagane'],
  },

  premiereTag: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('film', FilmSchema);
