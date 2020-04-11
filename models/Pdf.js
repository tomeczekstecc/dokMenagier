const mongoose = require('mongoose');

const PdfSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Pole Tytuł jest wymagane'],
    trim: true
  },
  type: {
    type: String,
    default: 'pdf',
    enum: ['pdf', 'film']
  },
  target: {
    type: String,
    default: 'ben',
    enum: ['ben', 'oper']
  },
  shortTitle: {
    type: String,
    required: [true, 'Pole Krótki Tytuł jestr wymagane'],
    trim: true
  },
  publishDate: {
    type: String,
    required: [true, 'Pole Data Publikacji jest wymagane'],
    trim: true
  },
  ver: {
    type: String,
    required: [true, 'Pole Wersja jest wymagane'],
    trim: true
  },
  pagesCount: {
    type: Number,
    required: [true, 'Pole Liczba Stron jest wymagane']
  },
  prevVer: {
    type: String,
    required: [true, 'Pole poprzednia wersja jest wymagane']
  },
  premiereTag: {
    type: Boolean,
    default: false
  },
  // coverImage: {
  //   type: Buffer,
  //   required: [true, 'Musisz załadować okładkę']
  // },
  // coverImageType: {
  //   type: String,
  //   required: true
  // },

  createdAt: {
    type: Date,
    default: Date.now
  },
  archived: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('pdf', PdfSchema);
