import express from 'express'
import { addProduct, getAllProducts, deleteProduct, updateProduct, getProduct } from '../controllers/productController.js'

const router = express.Router();

router.post("/create", addProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProduct)
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;