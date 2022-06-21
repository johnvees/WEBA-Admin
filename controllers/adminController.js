module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },

  viewProducts: (req, res) => {
    res.render('admin/products/view_products');
  },

  viewClients: (req, res) => {
    res.render('admin/clients/view_clients');
  },

  viewNews: (req, res) => {
    res.render('admin/news/view_news');
  },
};
