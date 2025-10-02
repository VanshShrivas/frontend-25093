import mongoose from "mongoose";
const MarksheetSchema = new mongoose.Schema({
  examName:{
    type:String,
    required:true,
  },
  yearOfPassing:{
    type:Number,
    required:true,
  },
  collegeName:{
    type:String,
    required:true,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  marksheetImage:{
///it will be image
    public_id:{
      type:String,
      required:true,
    },
    url:{
      type:String,
      required:true,
    }
  },
},{timestamps:true});
export const Marksheet=mongoose.model("Marksheet",MarksheetSchema);