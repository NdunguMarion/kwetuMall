import {model, Schema} from 'mongoose';

const userSchema = new Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cart:[{
        productId:String,
        quantity:Number
    }],
    wishlist:[{
        productId:String,
        quantity:Number
    }],
    shipmentDetails:[{
        city:String,
        town:String,
       streetAddress:String,
      
       
    }]
})

export default model ('userModel',userSchema);