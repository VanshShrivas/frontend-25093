import { Activity } from "../models/ActivitySchema";
import { User } from "../models/UserSchema.js";
import { Marksheet } from "../models/MarksheetSchema.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const createMarksheet=catchAsyncErrors(async(req,res,next)=>{
  if(req.user.role!=="Admin"){
    return res.status(401).json({
        success:false,
        message:"Only admin can add marksheets",
    });
  }
    const {examName,yearOfPassing,collegeName,rollno}=req.body;
    if(!examName || !yearOfPassing || !collegeName||!rollno){ 
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields",
        });
    }
    if(!req.files || req.files.length===0){
        return res.status(400).json({
            success:false,
            message:"Please provide marksheet image",
        });
    }
    const owner=await User.findOne({uniqueinstinumber:rollno});
    if(!owner){
        return res.status(404).json({
            success:false,
            message:"No user found with this roll number",
        });
    }
    let cloudinaryResponse;
    try{
        cloudinaryResponse=await cloudinary.uploader.upload(req.files[0].path,{
            folder:"marksheets",
            resource_type:"image",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Cloudinary Error",
            error:error.message,
        });
    }
    const marksheet=new Marksheet({
        examName,
        yearOfPassing,
        collegeName,
        owner:owner._id,
        marksheetImage:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        } 
    });
    await marksheet.save();
    return res.status(201).json({
        success:true,
        message:"Marksheet created successfully",
        marksheet,
    });
});
export const getMarksheet=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid marksheet id",
        });
    }
    const marksheet=await Marksheet.findById(id).populate("owner","name email uniqueinstinumber");
    if(!marksheet){
        return res.status(404).json({ 
            success:false,
            message:"Marksheet not found",
        });
    }
    if(marksheet.owner._id.toString()!==req.user._id.toString() && req.user.role!=="Admin"){
        return res.status(401).json({
            success:false,
            message:"You are not authorized to view this marksheet",
        });
    }
    return res.status(200).json({
        success:true,
        marksheet,
    });
});
export const deleteMarksheet=catchAsyncErrors(async(req,res,next)=>{
    if(req.user.role!=="Admin"){
        return res.status(401).json({
            success:false,
            message:"Only admin can delete marksheets",
        });
    }
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid marksheet id",
        });
    }
    const marksheet=await Marksheet.findById(id);
    if(!marksheet){
        return res.status(404).json({
            success:false,
            message:"Marksheet not found",
        });
    }
    try{
        await cloudinary.uploader.destroy(marksheet.marksheetImage.public_id);
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Cloudinary Error",
            error:error.message,
        });
    }
    await marksheet.deleteOne();
    return res.status(200).json({
        success:true,
        message:"Marksheet deleted successfully",
    });
});
export const getAllMarksheets=catchAsyncErrors(async(req,res,next)=>{
    let marksheets;
    if(req.user.role==="Admin"){
        marksheets=await Marksheet.find().populate("owner","name email uniqueinstinumber");
    }else{
        marksheets=await Marksheet.find({owner:req.user._id}).populate("owner","name email uniqueinstinumber");
    }
    return res.status(200).json({
        success:true,
        marksheets,
    });
});
export const getUserMarksheets=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid user id",
        });
    }
    const user=await User.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found",
        });
    }
    if(req.user.role!=="Admin" && req.user._id.toString()!==id){
        return res.status(401).json({
            success:false,
            message:"You are not authorized to view this user's marksheets",
        });
    }
    const marksheets=await Marksheet.find({owner:id}).populate("owner","name email uniqueinstinumber");
    return res.status(200).json({
        success:true,
        marksheets,
    });
}
);
export const updateMarksheet=catchAsyncErrors(async(req,res,next)=>{
    if(req.user.role!=="Admin"){
        return res.status(401).json({
            success:false, 
            message:"Only admin can update marksheets",
        });
    }
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid marksheet id",
        });
    }
    const marksheet=await Marksheet.findById(id);
    if(!marksheet){
        return res.status(404).json({
            success:false,
            message:"Marksheet not found",
        });
    }
    const {examName,yearOfPassing,collegeName,rollno}=req.body;
    if(examName){
        marksheet.examName=examName;
    }
    if(yearOfPassing){
        marksheet.yearOfPassing=yearOfPassing;
    }
    if(collegeName){
        marksheet.collegeName=collegeName;
    }
    if(rollno){
        const owner=await User.findOne({uniqueinstinumber:rollno});
        if(!owner){
            return res.status(404).json({
                success:false,
                message:"No user found with this roll number",
            });
        }
        marksheet.owner=owner._id;
    }
    let cloudinaryResponse;
    if (req.files!=null&& req.files.length!=0) {
        try{
            await cloudinary.uploader.destroy(marksheet.marksheetImage.public_id);
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Cloudinary Error",
                error:error.message,
            });
        }
        try{
            cloudinaryResponse=await cloudinary.uploader.upload(req.files[0].path,{
                folder:"marksheets",
                resource_type:"image",
            });
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Cloudinary Error",
                error:error.message,
            });
        }
        marksheet.marksheetImage={
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        };
    }
    await marksheet.save();
    return res.status(200).json({
        success:true,
        message:"Marksheet updated successfully",
        marksheet,
    });
});


    