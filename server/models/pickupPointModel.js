import {model, Schema} from 'mongoose';

const pickupPointSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    
})

export default model ('pickupPointModel', pickupPointSchema);