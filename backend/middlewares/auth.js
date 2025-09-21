import {User} from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Login first to access this resource",
        });
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    next();
});

export const authorizeRoles=(roles)=>{
    return (req,res,next)=>{
        console.log(req.user.role);
        // roles.map(role=>console.log(role));
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:`Role: ${req.user.role} is not allowed to access this resource`,
            });
        }
        next();
    };
};