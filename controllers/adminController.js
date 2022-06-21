module.exports = {
  viewDashboard: (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },

  viewProducts: (req, res) => {
    res.render('admin/products/view_products');
  },
};
