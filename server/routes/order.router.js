import express from "express";

import { verifyToken } from '../utilities/verifyToken.js'
import { verifyAdmin } from '../utilities/verifyAdmin.js'

import { createOrder, getAllOrders, getOrderById, getUserOrders } from '../controllers/order.controller.js'

const router = express.Router();

// Controller functions (to be implemented)
router.post('/', verifyToken, createOrder);
router.get('/:orderId', verifyToken, getOrderById);
router.get('/myorders', verifyToken, getUserOrders);
router.get('/orders', verifyToken, verifyAdmin, getAllOrders);

export default router;