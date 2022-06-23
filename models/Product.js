const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  client: {
    type: ObjectId,
    ref: 'Client',
  },
  deskripsi: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  gambarId: [
    {
      type: ObjectId,
      ref: 'Image',
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
