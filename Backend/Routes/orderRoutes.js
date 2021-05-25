import express from 'express';
import { addOrderItems, fetchAllOrders, fetchOrders, getOrderById, updateOrderToPaid, updateToDelivered } from '../controllers/orderController.js';
import {admin, protect} from '../middleware/authMiddleware.js';
const Router = express.Router()

Router.route('/').post(protect, addOrderItems).get(protect,admin, fetchAllOrders);
Router.route('/myorders').get(protect, fetchOrders);
Router.route('/:id').get(protect, getOrderById);
Router.route('/:id/pay').put(protect, updateOrderToPaid)
Router.route('/:id/deliver').put(protect, updateToDelivered)

export default Router;