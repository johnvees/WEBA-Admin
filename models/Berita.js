const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
  jenis: {
    type: String,
    required: true,
  },
  judul: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Berita', beritaSchema);
