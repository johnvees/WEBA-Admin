const Products = require('../models/Product');
const Clients = require('../models/Client');
const History = require('../models/Sejarah');
const News = require('../models/Berita');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const productsLanding = await Products.find()
        .select('_id gambarId')
        .limit(5)
        .populate({ path: 'gambarId', select: '_id imageUrl' });

      const clientsLanding = await Clients.find().select('_id nama imageUrl');
      res.status(200).json({ productsLanding, clientsLanding });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  productsPage: async (req, res) => {
    try {
      const products = await Products.find()
        .select('_id nama client gambarId')
        .populate({ path: 'gambarId', select: '_id imageUrl' })
        .populate({ path: 'client', select: '_id nama' });
      res.status(200).json({ count: products.length, products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  detailProductPage: async (req, res) => {
    try {
      const { id } = req.params;
      const detailProducts = await Products.findOne({ _id: id }).populate({
        path: 'gambarId',
        select: '_id imageUrl',
      });

      const products = await Products.find()
        .select('_id nama client gambarId')
        .limit(4)
        .populate({ path: 'gambarId', select: '_id imageUrl' })
        .populate({ path: 'client', select: '_id nama' });
      res.status(200).json({ ...detailProducts._doc, products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  aboutPage: async (req, res) => {
    try {
      const history = await History.find().populate({
        path: 'gambarId',
        select: '_id imageUrl',
      });
      res.status(200).json({ history });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  newsPage: async (req, res) => {
    try {
      const news = await News.find().select('_id judul deskripsi imageUrl');
      res.status(200).json({ news });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  detailNewsPage: async (req, res) => {
    try {
      const { id } = req.params;
      const detailNews = await News.findOne({ _id: id });
      res.status(200).json({ detailNews });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
