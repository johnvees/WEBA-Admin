const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');

router.get('/dashboard', adminController.viewDashboard);

// endpoint products
router.get('/products', adminController.viewProducts);
router.post('/products', uploadMultiple, adminController.addProducts);
router.get('/products/detail-product/:id', adminController.detailProducts);
router.get('/products/update-product/:id', adminController.showUpdateProducts);
router.put(
  '/products/update-product/:id',
  uploadMultiple,
  adminController.updateProducts
);
router.delete('/products/:id/delete', adminController.deleteProducts);

// endpoint clients
router.get('/clients', adminController.viewClients);
router.post('/clients', uploadSingle, adminController.addClients);
router.get('/clients/detail-client/:id', adminController.detailClients);
router.get('/clients/update-client/:id', adminController.showUpdateClients);
router.put(
  '/clients/update-client/:id',
  uploadSingle,
  adminController.updateClients
);
router.delete('/clients/:id/delete', adminController.deleteClients);

// endpoint news
router.get('/news', adminController.viewNews);
router.post('/news', uploadSingle, adminController.addNews);
router.get('/news/detail-news/:id', adminController.detailNews);
router.get('/news/update-news/:id', adminController.showUpdateNews);
router.put('/news/update-news/:id', uploadSingle, adminController.updateNews);
router.delete('/news/:id/delete', adminController.deleteNews);

// endpoint history
router.get('/history', adminController.viewHistory);
router.post('/history', uploadMultiple, adminController.addHistory);
router.get('/history/detail-history/:id', adminController.detailHistory);
router.get('/history/update-history/:id', adminController.showUpdateHistory);
router.put(
  '/history/update-history/:id',
  uploadMultiple,
  adminController.updateHistory
);
router.delete('/history/:id/delete', adminController.deleteHistory);

module.exports = router;
