const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);
router.get('/products', adminController.viewProducts);
router.get('/clients', adminController.viewClients);

module.exports = router;
