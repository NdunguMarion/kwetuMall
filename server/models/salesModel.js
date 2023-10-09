import { model, Schema } from 'mongoose';

const salesSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    buyingPrice: {
        type: Number,
        required: true
    }
})

export default model('salesModel', salesSchema);