const router = require('express').Router();
const apiController = require('../controllers/apiController');
// const { uploadSingle, uploadMultiple } = require('../middlewares/multer');

router.get('/landing-page', apiController.landingPage);
router.get('/products-page', apiController.productsPage);
router.get('/detail-products-page/:id', apiController.detailProductPage);
router.get('/about-page', apiController.aboutPage);
router.get('/news-page', apiController.newsPage);
router.get('/detail-news-page/:id', apiController.detailNewsPage);


module.exports = router;
