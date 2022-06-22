const Clients = require('../models/Client');
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
  viewNews: (req, res) => {
    res.render('admin/news/view_news', {
      title: 'WEBA Admin | News',
    });
  },

  // endpoint history
  viewHistory: (req, res) => {
    res.render('admin/history/view_history', {
      title: 'WEBA Admin | History',
    });
  },
};
