import {model, Schema} from 'mongoose'

const productSchema = new Schema ({
    name:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    buyingPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    categories:[String],
    variants:[String],
    reviews:[{
        userName:String,
        review:String,
        timeStamp:Date
    }]
    
})

export default model('productModel',productSchema);