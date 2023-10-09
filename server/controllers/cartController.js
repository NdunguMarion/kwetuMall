import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js"
import saleModel from "../models/productModel.js"
import salesModel from "../models/salesModel.js";

export const addToCart = async (req, res) => {
    //find the user
    const user = await userModel.findOne({ _id: req.user._id });
    const cart = user.cart;
    //check if the product already exists in cart
    const productExists = cart.find((cartItem) => cartItem.productId === req.body.productId);
    //if the product exists send a message 'aleady in cart'
    if (productExists) {
        res.send({
            message: 'product already in cart',
        });
    } else {
        user.cart = [...user.cart, { productId: req.body.productId, quantity: req.body.quantity }];
        const newUser = await user.save()
        res.send({
            message: 'added to cart',
            data: newUser.cart,
        });
    }
    //if not add to cart
}

export const getCartItems = async (req, res) => {
    try {
        const cart = req.user.cart;
        let products = []
        for (let i = 0; i < cart.length; i++) {
            let product = await productModel.findOne({ _id: cart[i].productId });
            products = [...products, { product: product, quantity: cart[i].quantity },];
        }
        res.send({
            message: 'fetched cart items',
            data: products,
        });
    } catch (error) {
        res.send({
            mesaage: 'error occured',
            data: error.message
        })
    }
}
export const deleteItem = async (req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.user._id});
        const cart = user.cart
        let filteredCartItem = cart.filter((item)=>{
                return item.productId !== req.params.id
        })
        user.cart= filteredCartItem
        await user.save();
        res.send({
            message:'Deleted Item'
        })

    } catch (error) {
        res.send({
            message:'error occured',
            data:error.message
        })
    }
}
export const checkout = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.user._id });
        const cart = user.cart;
        for (let i = 0; i < cart.length; i++) {
            const product = await productModel.findOne({ _id: cart[i].productId });
            product.stock = product.stock - cart[i].quantity;
            await product.save();

            const newSale = new salesModel({
                productId: product._id,
                userId: user._id,
                quantity: cart[i].quantity,
                buyingPrice: product.buyingPrice,
                sellingPrice: product.sellingPrice
            });
            await newSale.save();
        }
        user.cart = [];
        await user.save();
        res.send({
            message: 'Successfully ckecked out'
        })
    } catch (error) {
        res.send({
            mesaage: 'error occured',
            data: error.message
        })
    }
    //reduce the stock on productModel
    //record the saleModel
    //remove the cart items from userModel
}