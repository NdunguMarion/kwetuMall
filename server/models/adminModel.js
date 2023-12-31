import {model, Schema} from 'mongoose'

const adminSchema = new Schema({
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
   
})

export default model ('adminModel',adminSchema);