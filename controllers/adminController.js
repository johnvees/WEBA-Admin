const Clients = require('../models/Client');

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
        title: 'WEBA Admin | Detail Clients',
        action: 'detail',
      });
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
