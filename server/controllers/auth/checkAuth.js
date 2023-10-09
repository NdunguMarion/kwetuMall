import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";

const checkAuth = (req, res, next)=>{
    const {authorization}= req.headers;
    if(!authorization){
        res.send({
            message:'You must be logged in'
        })
    }else {
        const token = authorization.replace('Bearer ', '');
        jwt.verify(token,'MY_SECRET_KEY',async(err, data)=>{
            if (err){
                res.send({
                    message:'You must be logged in'
                })
            }else {
                const user = await userModel.findOne({_id:data.userId});
                req.user = user;
                next();
            }  
        })
    }
}
export default checkAuth;
//finding the logged in user
//get the jwt token which is sent to us in headers under authorization
//verify token
//get the userId from the token
//find the user by the userId
//continue to next function
