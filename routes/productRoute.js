import express from 'express'
import { addProduct, getAllProducts, deleteProduct, updateProduct, getProduct, getProductByName } from '../controllers/productController.js'

const router = express.Router();

router.post("/create", addProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProduct)
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/getProductByName/:name", getProductByName);

export default router;