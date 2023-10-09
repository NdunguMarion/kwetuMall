import express from "express";
import checkAuth from "../controllers/auth/checkAuth.js";
import { addToCart, getCartItems , checkout, deleteItem} from '../controllers/cartController.js'


const router = express.Router();

router.post('/add-to-cart', checkAuth, addToCart);
router.get('/get-cart-items', checkAuth, getCartItems);
router.post('/checkout', checkAuth, checkout);
router.post('/cart-details/delete/:id',checkAuth, deleteItem);

export default router;

