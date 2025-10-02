import { Activity } from "../models/ActivitySchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { generateToken } from "../utils/jwtToken.js";
export const createAdminUser=catchAsyncErrors(async(req,res,next)=>{
    const {uniqueinstinumber,Name,email}=req.body;
    if(!uniqueinstinumber || !Name || !email){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details",
        });
    }
    const temp=await User.findOne({uniqueinstinumber});
    if(temp){
        return res.status(400).json({
            success:false,
            message:"User with this UIN already exists",
        });
    }
    const role="Admin";
    const user=await User.create({
        uniqueinstinumber,
        Name,
        email,
        role,
    });
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user,
    });
});
export const createStudentUser=catchAsyncErrors(async(req,res,next)=>{
    const {uniqueinstinumber,Name,email}=req.body;
    if(!uniqueinstinumber || !Name || !email){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details",
        });
    }
    const temp=await User.findOne({uniqueinstinumber});
    if(temp){
        return res.status(400).json({
            success:false,
            message:"User with this UIN already exists",
        });
    }
    const role="Student";
    const user=await User.create({
        uniqueinstinumber,
        Name,
        email,
        role,
    });
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user,
    });
});
export const loginuser=catchAsyncErrors(async(req,res,next)=>{
    const {data}=req.body;
    console.log(data);
    if(!data){
        return res.status(400).json({
            success:false,
            message:"Please provide email to login",
        });
    }
    try{
    const user=await User.findOne({email});
    generateToken(user,"Logged in successfully",200,res);}
    catch{
      return res.status(404).json({
        success:false,
        message:"No such user exists"
      })
    }
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Successfully.",
    });
});
export const getAllStudents=catchAsyncErrors(async(req,res,next)=>{
  const users=await User.find({role:"Student"}).populate("Activity");
    res.status(200).json({
        success:true,
        users,
    });
});
export const getuserdata=catchAsyncErrors(async(req,res,next)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      success:false,
      message:"Invalid user id",
    });
  }
  if(req.user._id.toString()!==id && req.user.role!=="Admin"){
    return res.status(403).json({
      success:false,
      message:"You are not allowed to access this resource",
    });
  }
  const user=await User.findById(id).populate("Activity");
  if(!user){
    return res.status(404).json({
      success:false,
      message:"User not found",
    });
  }
    res.status(200).json({
        success:true,
        user,
        Activities:user.Activity,
    });
});