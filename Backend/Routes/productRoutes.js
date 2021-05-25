import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createNewProduct, updateStockCount, createReview, getTopProducts} from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js';
const Router = express.Router();

Router.route('/').get(getProducts).post(protect, admin, createProduct);
Router.get('/top',getTopProducts)
Router.route('/:id').get(getProductById)
Router.route('/admin/:id').delete(protect, admin, deleteProduct);
Router.route('/admin/:id').put( protect, admin, updateProduct);
Router.route('/:id').put( protect, updateStockCount);
Router.route('/admin').post(protect, admin, createNewProduct);
Router.route('/:id/review').post(protect,createReview);

export default Router;