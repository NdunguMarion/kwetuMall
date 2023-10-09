import pickupPointModel from '../models/pickupPointModel.js';

//add code to get all the pickup points in getpickupPoints functions

export const getPickUpPoints = async(req, res)=>{
    try{
        const pickupPoints = await pickupPointModel.find();
        res.send({
            message:'Fetched pickup points!',
            data: pickupPoints
        })
    }catch(error){
        res.send({
            message:'Error occured',
            data: error.message 
        })
    }
}
export const getPickUpPoint = async(req, res)=>{
    try{
        const pickupPointId = req.params.id;
        const pickupPoint= await pickupPointModel.findOne({ _id:pickupPointId});
        res.send({
            message:'Fetched pickup point!',
            data: pickupPoint
        })
    }catch(error){
        res.send({
            message:'Error occured',
            data: error.message
        })
    }
}
export const createPickUpPoint = async(req, res)=>{
    try{
        const newPickupPoint= new pickupPointModel({
            location: req.body.location, 
            name: req.body.name
        });
        const pickupPoint = await newPickupPoint.save();
        res.send({
            message:' Created pickup point!',
            data: pickupPoint
        })
    }catch(error){
        res.send({
            message:'Error occured',
            data: error.message
        })
    }
}
export const updatePickUpPoint = async(req, res)=>{
    try{
        const pickUpPoint = await pickupPointModel.findOne({ _id: req.params.id});
        pickUpPoint.location = req.body.location;
        pickUpPoint.name = req.body.name;
        const newPickupPoint= await pickUpPoint.save();
        res.send({
            message:'Updated pickup point!',
            data: newPickupPoint
        })
    }catch(error){
        res.send({
            message:'Error occured',
            data: error.message
        })
    }
}
export const deletePickUpPoint = async(req, res)=>{
    try{
        await pickupPointModel.deleteOne({id:req.params.id})
        res.send({
            message:'Deleted pickup points!',
        })
    }catch(error){
        res.send({
            message:'Error occured',
            data: error.message
        })
    }
}