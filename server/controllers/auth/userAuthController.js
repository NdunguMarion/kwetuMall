import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRound = 10;

export const register = async (req, res)=>{
    try {
        if (!req.body || !req.body.password){
            res.send({
                message:'user details not found'
            })
        }else{
            bcrypt.hash (req.body.password, saltRound, async(err, hash)=>{
                if (err){
                    console.log(err)
                }
                const newUser = new userModel({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    phoneNumber:req.body.phoneNumber,
                    password:hash
                });
                const user = await newUser.save();
                res .send({
                    message:'User created',
                    data:user
                })
            })
        }
    } catch (error) {
        res.send({
            message: "Error occured",
            data: error.message,
          });  
    }
};
export const login = async (req, res)=>{
   if (!req.body.email || !req.body.password){
        res.send({
            message:'wrong email or password',
        });
      } else {
        //findd user with that email address
        const user = await userModel.findOne({email:req.body.email});
        if (!user){
            res.send({
                message :'wrong email or password',
            })
        }else{
            bcrypt.compare(req.body.password,user.password,(err,response)=>{
                if (err){
                    console.log(err)
                }
                if (response === false){
                    res.send({
                        message:'wrong email or password',
                    });
                }else if (response ===true){
                    const token = jwt.sign ({userId:user._id}, 'MY_SECRET_KEY')
                    res.send({
                        message:'user authenticated succesfully!',
                        data:user,
                        token:token
                    })
                }
            })
        }
    }
};
