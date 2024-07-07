import express from 'express'
import { addProduct, getAllProducts } from '../controllers/productController.js'

const router = express.Router();

router.post("/create", addProduct);
router.get("/getProducts", getAllProducts);

export default router;