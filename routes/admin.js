const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle } = require('../middlewares/multer');

router.get('/dashboard', adminController.viewDashboard);

// endpoint products
router.get('/products', adminController.viewProducts);

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

module.exports = router;
