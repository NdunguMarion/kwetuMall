import multer from 'multer'
import express from 'express';
import {getProducts, getProduct, createProducts, updateProducts, deleteProducts} from '../controllers/productController.js'

const router = express.Router();

const upload = multer ({ dest:'uploads'});
const uploadProductImage= upload.fields([
    {name:'image', maxcount:1} 
]);

router.get('/products',getProducts);
router.get('/products/:id',getProduct);
router.post('/products/create',uploadProductImage, createProducts);
router.post('/products/update/:id',uploadProductImage, updateProducts);
router.post('/products/delete/:id',deleteProducts);

export default router;