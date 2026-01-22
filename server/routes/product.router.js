import express from "express";
import { verifyToken } from "../utilities/verifyToken.js";
import { verifyAdmin } from "../utilities/verifyAdmin.js";
import { validateProductInput } from "../middleware/validateProductInput.js";
import { createProduct, deleteProduct, getProductById, getProducts } from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.js";


const router = express.Router();

router
.route('/').post(upload.array('images', 6),verifyToken, verifyAdmin , validateProductInput, createProduct)
.get(getProducts)
router.route('/:productId').get(getProductById)

router.route('/:productId').delete(verifyToken, verifyAdmin, deleteProduct)

export default router
