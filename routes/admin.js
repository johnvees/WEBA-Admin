const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle } = require('../middlewares/multer');

router.get('/dashboard', adminController.viewDashboard);

// endpoint products
router.get('/products', adminController.viewProducts);

// endpoint clients
router.get('/clients', adminController.viewClients);
router.get('/clients/detail-client/:id', adminController.detailClients);
router.post('/clients', uploadSingle, adminController.addClients);
router.get('/clients/update-client/:id', adminController.showUpdateClients);
router.put(
  '/clients/update-client/:id',
  uploadSingle,
  adminController.updateClients
);
router.delete('/clients/:id/delete', adminController.deleteClients);

// endpoint news
router.get('/news', adminController.viewNews);

// endpoint history
router.get('/history', adminController.viewHistory);

module.exports = router;
