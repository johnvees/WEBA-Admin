const Clients = require('../models/Client');
const News = require('../models/Berita');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard', {
      title: 'WEBA Admin | Dashboard',
    });
  },

  // endpoint products
  viewProducts: (req, res) => {
    res.render('admin/products/view_products', {
      title: 'WEBA Admin | Products',
    });
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
