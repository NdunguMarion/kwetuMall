import {model, Schema} from 'mongoose';

const shipmentPaymentSchema = new Schema({
    city:{
        type:String,
        required:true
    },
    deliveryCost:{
        type:Number,
        required:true
    }
})

export default model ('shipmentPaymentModel', shipmentPaymentSchema);