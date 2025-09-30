import mongoose from "mongoose";
const ActivitySchema = new mongoose.Schema({
  type:{
    type:String,
    enum:["Seminars","Conferences","Certifications","Workshops","Online Courses","Internships","Postition of Responsibility","Club Activities/Volunteering Efforts","Competitions","Academic Contests","Community Service"],
    required:true,  
  },
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  proof:{
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
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  verfiedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User",
  },
},{timestamps:true});
export const Activity=mongoose.model("Activity",ActivitySchema);