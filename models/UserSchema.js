import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  uniqueinstinumber:{
    type:Number,
    required:true,
  },
  Name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:["Student","Admin"],
  },
  Activity:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Activity",
  }
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export const User = mongoose.model("User",userSchema); 