const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const sejarahSchema = new mongoose.Schema({
  jmlClient: {
    type: Number,
    required: true,
  },
  jmlProject: {
    type: Number,
    required: true,
  },
  jmlProdukJadi: {
    type: Number,
    required: true,
  },
  namaLeader: {
    type: String,
    required: true,
  },
  jabatanLeader: {
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

module.exports = mongoose.model('Sejarah', sejarahSchema);
