import { Activity } from "../models/ActivitySchema.js";
import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";  /////it is used to handle error in async functions
//create activity
export const createActivity = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file",
    });
  }
  const { image } = req.files;
  const { type, title, description } = req.body;
  if (!type || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the details",
    });
  }
  if (!["Seminars", "Conferences", "Certifications", "Workshops", "Online Courses", "Internships", "Postition of Responsibility", "Club Activities/Volunteering Efforts", "Competitions", "Academic Contests", "Community Service"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid activity type",
    });
  }
  const curruser = await Student.findById(req.user._id);
  if (!curruser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  /////ye cloudinary me file upload karne ke liye hai
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: "SIH_2025_activity_proofs",
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown cloudinary error."
      );
      return res.status(500).json({
        success: false,
        message: "Failed to upload image. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload image. Please try again later.",
    });
  }

  const newactivity = await Activity.create({
    type,
    title,
    description,
    proof: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    createdBy: curruser._id,
  });
  await newactivity.save();
  curruser.Activity.push(newactivity._id);
  await curruser.save();
  res.status(201).json({
    success: true,
    message: "Activity created successfully",
    newactivity,
  });
});
// get all activities of a student

export const getAllActivities = catchAsyncErrors(async(req,res,next)=>{
    // Temporary: Get all and filter manually
    const allActivities = await Activity.find({});
    const userActivities = allActivities.filter(activity => 
        activity.createdBy && activity.createdBy.toString() === req.user._id.toString()
    );
    
    res.status(200).json({
        success: true,
        activities: userActivities,
    });
});

// export const getAllActivities = catchAsyncErrors(async(req,res,next)=>{
//     const userId = req.user._id.toString();
//     console.log('🔍 User ID:', JSON.stringify(userId));
    
//     // Test 1: Direct MongoDB query
//     const test1 = await Activity.find({ createdBy: userId });
//     console.log('Test 1 - Direct query:', test1.length);
    
    
//     // Test 4: Hardcoded exact same string
//     const hardcodedId = "68db928a61dea86ff8f245d1";
//     const test4 = await Activity.find({ createdBy: hardcodedId });
//     console.log('Test 4 - Hardcoded:', test4.length);
//     console.log('Hardcoded ID === User ID:', hardcodedId === userId);
    
//     res.status(200).json({
//         success: true,
//         test1: test1.length,
//         test4: test4.length,
//         userId: userId,
//         hardcodedId: hardcodedId,
//         exactMatch: hardcodedId === userId
//     });
// });

///for all unverified activities for admin
export const getAllUnverifiedActivities = catchAsyncErrors(async (req, res, next) => {
  // const admin=await Admin.findById(req.user._id);
  // if(!admin){
  //     return res.status(404).json({
  //         success:false,
  //         message:"Admin not found",
  //     });
  // }
  const activities = await Activity.find({ isVerified: false }).populate("createdBy", "Name RollNumber email");
  res.status(200).json({
    success: true,
    activities,
  });
});
///verify activity
export const verifyActivity = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid activity id",
    });
  }
  const curruser = await User.findById(req.user._id);
  // if(!admin){
  //     return res.status(404).json({
  //         success:false,
  //         message:"Admin not found",
  //     });
  // }
  const activity = await Activity.findById(activityId);
  if (!activity) {
    return res.status(404).json({
      success: false,
      message: "Activity not found",
    });
  }
  if (activity.isVerified) {
    return res.status(400).json({
      success: false,
      message: "Activity already verified",
    });
  }
  activity.isVerified = true;
  activity.verfiedBy = curruser._id;
  await activity.save();
  res.status(200).json({
    success: true,
    message: "Activity verified successfully",
    activity,
  });
});
///get all verified activities
export const getAllVerifiedActivities = catchAsyncErrors(async (req, res, next) => {
  const activities = await Activity.find({ isVerified: true }).populate("createdBy", "Name RollNumber email").populate("verfiedBy", "Name RollNumber Email");
  res.status(200).json({
    success: true,
    activities,
  });
});
///get all activities
export const getAllActivitiesAdmin = catchAsyncErrors(async (req, res, next) => {
  const activities = await Activity.find({}).populate("createdBy", "Name RollNumber email").populate("verfiedBy", "Name RollNumber Email"); ///ye populate isliye kiya taki hume sirf id na mile created by aur verified by me se balki unka naam aur roll number bhi mil jaye
  res.status(200).json({
    success: true,
    activities,
  });
});
//get single activity details
export const getSingleActivityDetails = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid activity id",
    });
  }
  const activity = await Activity.findById(activityId).populate("createdBy", "Name RollNumber email").populate("verfiedBy", "Name RollNumber Email");
  if (!activity) {
    return res.status(404).json({
      success: false,
      message: "Activity not found",
    });
  }
  if (activity.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to view this activity",
    });
  }
  res.status(200).json({
    success: true,
    activity,
  });
});
///update activity
export const updateActivity = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid activity id",
    });
  }
  const activity = await Activity.findById(activityId);
  if (!activity) {
    return res.status(404).json({
      success: false,
      message: "Activity not found",
    });
  }
  ///ye authorized ke liye iska middleware banauga
  if (activity.createdBy.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to update this activity",
    });
  }
  //////
  if (activity.isVerified) {
    return res.status(400).json({
      success: false,
      message: "You cannot update a verified activity",
    });
  }
  const { type, title, description } = req.body;
  if (type) {
    if (!["Seminars", "Conferences", "Certifications", "Workshops", "Online Courses", "Internships", "Postition of Responsibility", "Club Activities/Volunteering Efforts", "Competitions", "Academic Contests", "Community Service"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid activity type",
      });
    }
    activity.type = type;
  }
  if (title) {
    activity.title = title;
  }
  if (description) {
    activity.description = description;
  }
  if (req.files && req.files.image) {
    const { image } = req.files;
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
          folder: "SIH_2025_activity_proofs",
        }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary error:",
          cloudinaryResponse.error || "Unknown cloudinary error."
        );
        return res.status(500).json({
          success: false,
          message: "Failed to upload image. Please try again later.",
        });
      }
      activity.proof = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }
    catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image. Please try again later.",
      });
    }
  }
  await activity.save();
  res.status(200).json({
    success: true,
    message: "Activity updated successfully",
    activity,
  });
});
///delete activity
export const deleteActivity = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid activity id",
    });
  }

  const activity = await Activity.findById(activityId);
  if (!activity) {
    return res.status(404).json({
      success: false,
      message: "Activity not found",
    });
  }
  ///ye authorized ke liye iska middleware banauga
  // if(activity.createdBy.toString()!==req.user._id.toString()){
  //     return res.status(401).json({
  //         success:false,
  //         message:"You are not authorized to delete this activity",
  //     });
  // }
  //////
  if (activity.isVerified) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete a verified activity",
    });
  }

  const curruser = await curruser.findById(req.user._id);
  if (curruser.role !== "Admin" && activity.createdBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to delete this activity",
    });
  }
  await activity.remove();
  curruser.Activity = curruser.Activity.filter((actId) => actId.toString() !== activityId.toString());
  await curruser.save();
  res.status(200).json({
    success: true,
    message: "Activity deleted successfully",
  });
});
