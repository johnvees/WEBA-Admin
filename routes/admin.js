const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle } = require('../middlewares/multer');

router.get('/dashboard', adminController.viewDashboard);

// endpoint products
router.get('/products', adminController.viewProducts);

// endpoint clients
router.get('/clients', adminController.viewClients);
router.post('/clients', uploadSingle, adminController.addClients);

// endpoint news
router.get('/news', adminController.viewNews);

// endpoint history
router.get('/history', adminController.viewHistory);

module.exports = router;
