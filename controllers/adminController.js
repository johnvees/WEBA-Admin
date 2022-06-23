const Clients = require('../models/Client');
const News = require('../models/Berita');
const Products = require('../models/Product');
const Image = require('../models/Image');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard', {
      title: 'WEBA Admin | Dashboard',
    });
  },

  // endpoint products
  viewProducts: async (req, res) => {
    try {
      const products = await Products.find()
        .populate({
          path: 'gambarId',
          select: 'id imageUrl',
        })
        .populate({ path: 'client', select: 'id nama' });
      console.log(products);
      const clients = await Clients.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/products/view_products', {
        title: 'WEBA Admin | Products',
        clients,
        products,
        alert,
        action: 'view',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/products');
    }
  },

  detailProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Products.findOne({ _id: id })
        .populate({
          path: 'gambarId',
          select: 'id imageUrl',
        })
        .populate({ path: 'client', select: 'id nama' });
      const clients = await Clients.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/products/view_products', {
        title: 'WEBA Admin | Detail Product',
        products,
        clients,
        alert,
        action: 'detail',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/products');
    }
  },

  addProducts: async (req, res) => {
    try {
      const { kode, nama, client, deskripsi, detail, material } = req.body;
      if (req.files.length > 0) {
        const clients = await Clients.findOne({ _id: client });
        const newProducts = {
          client: clients._id,
          kode,
          nama,
          deskripsi,
          detail,
          material,
        };
        const products = await Products.create(newProducts);
        clients.productId.push({ _id: products._id });
        await clients.save();
        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          products.gambarId.push({ _id: imageSave._id });
          await products.save();
        }
      }
      req.flash('alertMessage', 'Success Add New Product');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/products');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/products');
    }
  },

  showUpdateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Products.findOne({ _id: id })
        .populate({
          path: 'gambarId',
          select: 'id imageUrl',
        })
        .populate({ path: 'client', select: 'id nama' });
      const clients = await Clients.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/products/view_products', {
        title: 'WEBA Admin | Update Product',
        clients,
        products,
        alert,
        action: 'update',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/products');
    }
  },

  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const { kode, nama, client, deskripsi, detail, material } = req.body;
      const products = await Products.findOne({ _id: id })
        .populate({
          path: 'gambarId',
          select: 'id imageUrl',
        })
        .populate({ path: 'client', select: 'id nama' });
      if (req.files.length > 0) {
        for (let i = 0; i < products.gambarId.length; i++) {
          const imageUpdate = await Image.findOne({
            _id: products.gambarId[i]._id,
          });
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `images/${req.files[i].filename}`;
          await imageUpdate.save();
        }
        products.kode = kode;
        products.nama = nama;
        products.client = client;
        products.deskripsi = deskripsi;
        products.detail = detail;
        products.material = material;
        await products.save();
        req.flash('alertMessage', 'Success Update Data Product');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/products');
      } else {
        products.kode = kode;
        products.nama = nama;
        products.client = client;
        products.deskripsi = deskripsi;
        products.detail = detail;
        products.material = material;
        await products.save();
        req.flash('alertMessage', 'Success Update Data Product');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/products');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/products');
    }
  },

  deleteClients: async (req, res) => {
    try {
      const { id } = req.params;
      const clients = await Clients.findOne({ _id: id });
      await fs.unlink(path.join(`public/${clients.imageUrl}`));
      await clients.remove();
      req.flash('alertMessage', 'Success Delete Data Client');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/clients');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  deleteProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Products.findOne({ _id: id }).populate('gambarId');
      for (let i = 0; i < products.gambarId.length; i++) {
        Image.findOne({ _id: products.gambarId[i]._id })
          .then((image) => {
            fs.unlink(path.join(`public/${image.imageUrl}`));
            image.remove();
          })
          .catch((error) => {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/products');
          });
      }
      await products.remove();
      req.flash('alertMessage', 'Success Delete Data Product');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/products');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/products');
    }
  },

  // endpoint clients
  viewClients: async (req, res) => {
    try {
      const clients = await Clients.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      console.log(clients);
      res.render('admin/clients/view_clients', {
        clients,
        alert,
        title: 'WEBA Admin | Clients',
        action: 'view',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  detailClients: async (req, res) => {
    try {
      const { id } = req.params;
      const clients = await Clients.findOne({ _id: id });
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/clients/view_clients', {
        clients,
        alert,
        title: 'WEBA Admin | Detail Client',
        action: 'detail',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  addClients: async (req, res) => {
    try {
      const { nama } = req.body;
      console.log(req.file);
      await Clients.create({ nama, imageUrl: `images/${req.file.filename}` });
      req.flash('alertMessage', 'Success Add New Client');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/clients');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  showUpdateClients: async (req, res) => {
    try {
      const { id } = req.params;
      const clients = await Clients.findOne({ _id: id });
      console.log(clients);
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/clients/view_clients', {
        clients,
        alert,
        title: 'WEBA Admin | Update Client',
        action: 'update',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  updateClients: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama } = req.body;
      const clients = await Clients.findOne({ _id: id });
      console.log(clients);
      if (req.file == undefined) {
        clients.nama = nama;
        await clients.save();
        req.flash('alertMessage', 'Success Update Data Client');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/clients');
      } else {
        await fs.unlink(path.join(`public/${clients.imageUrl}`));
        clients.nama = nama;
        clients.imageUrl = `images/${req.file.filename}`;
        await clients.save();
        req.flash('alertMessage', 'Success Update Data Client');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/clients');
      }
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  deleteClients: async (req, res) => {
    try {
      const { id } = req.params;
      const clients = await Clients.findOne({ _id: id });
      await fs.unlink(path.join(`public/${clients.imageUrl}`));
      await clients.remove();
      req.flash('alertMessage', 'Success Delete Data Client');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/clients');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  // endpoint news
  viewNews: async (req, res) => {
    try {
      const news = await News.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      console.log(news);
      res.render('admin/news/view_news', {
        news,
        alert,
        title: 'WEBA Admin | News',
        action: 'view',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/news');
    }
  },

  detailNews: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await News.findOne({ _id: id });
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/news/view_news', {
        news,
        alert,
        title: 'WEBA Admin | Detail News',
        action: 'detail',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/news');
    }
  },

  addNews: async (req, res) => {
    try {
      const { jenis, judul, deskripsi, penulis, tanggal, isi } = req.body;
      console.log(req.file);
      await News.create({
        jenis,
        judul,
        deskripsi,
        penulis,
        tanggal,
        isi,
        imageUrl: `images/${req.file.filename}`,
      });
      req.flash('alertMessage', 'Success Add New News');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/news');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/news');
    }
  },

  showUpdateNews: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await News.findOne({ _id: id });
      console.log(news);
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/news/view_news', {
        news,
        alert,
        title: 'WEBA Admin | Update News',
        action: 'update',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/news');
    }
  },

  updateNews: async (req, res) => {
    try {
      const { id } = req.params;
      const { jenis, judul, deskripsi, penulis, tanggal, isi } = req.body;
      const news = await News.findOne({ _id: id });
      console.log(news);
      if (req.file == undefined) {
        news.jenis = jenis;
        news.judul = judul;
        news.deskripsi = deskripsi;
        news.penulis = penulis;
        news.tanggal = tanggal;
        news.isi = isi;
        await news.save();
        req.flash('alertMessage', 'Success Update News Data');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/news');
      } else {
        await fs.unlink(path.join(`public/${news.imageUrl}`));
        news.jenis = jenis;
        news.judul = judul;
        news.deskripsi = deskripsi;
        news.penulis = penulis;
        news.tanggal = tanggal;
        news.isi = isi;
        news.imageUrl = `images/${req.file.filename}`;
        await news.save();
        req.flash('alertMessage', 'Success Update News Data');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/news');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/news');
    }
  },

  deleteClients: async (req, res) => {
    try {
      const { id } = req.params;
      const clients = await Clients.findOne({ _id: id });
      await fs.unlink(path.join(`public/${clients.imageUrl}`));
      await clients.remove();
      req.flash('alertMessage', 'Success Delete Data Client');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/clients');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/clients');
    }
  },

  deleteNews: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await News.findOne({ _id: id });
      await fs.unlink(path.join(`public/${news.imageUrl}`));
      await news.remove();
      req.flash('alertMessage', 'Success Delete News Data');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/news');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/news');
    }
  },

  // endpoint history
  viewHistory: (req, res) => {
    res.render('admin/history/view_history', {
      title: 'WEBA Admin | History',
    });
  },
};
