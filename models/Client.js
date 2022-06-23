const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  productId: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
});

module.exports = mongoose.model('Client', clientSchema);
