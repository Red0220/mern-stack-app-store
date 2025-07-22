import express from "express";
import { verifyToken } from "../utilities/vrifyToken.js";
import { verifyAdmin } from "../utilities/verifyAdmin.js";
import { validateProductInput } from "../middleware/validateProductInput.js";
import { createProduct, deleteProduct, getProductById, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.route('/add-product').post(verifyToken, verifyAdmin , validateProductInput, createProduct);
router.route('/:productId').get(verifyToken, getProductById)
router.route('/').get(getProducts)
router.route('/delete/:productId').delete(verifyToken, verifyAdmin, deleteProduct)

export default router
