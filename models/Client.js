const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Client', clientSchema);
