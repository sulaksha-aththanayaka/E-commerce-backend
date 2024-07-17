import express from 'express'
import { addProduct, getAllProducts, deleteProduct, updateProduct, getProduct, getProductByName, uploadFile } from '../controllers/productController.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
const upload = multer({ storage: storage })


const router = express.Router();

router.post("/create", addProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProduct)
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/getProductByName/:name", getProductByName);
router.post("/uploadFile", upload.single('file'), uploadFile);
router.post('/addProduct', upload.single('img'), addProduct);

export default router;