import { Activity } from "../models/ActivitySchema.js";
import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Valid activity types
const activityTypes = [
  "Seminars",
  "Conferences",
  "Certifications",
  "Workshops",
  "Online Courses",
  "Internships",
  "Position of Responsibility",
  "Club Activities/Volunteering Efforts",
  "Competitions",
  "Academic Contests",
  "Community Service",
];

// ---------------- CREATE ACTIVITY ----------------
export const createActivity = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.image) {
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

  if (!activityTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid activity type",
    });
  }

  const currUser = await User.findById(req.user._id);
  if (!currUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "SIH_2025_activity_proofs",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload image. Please try again later.",
    });
  }

  const newActivity = await Activity.create({
    type,
    title,
    description,
    proof: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    createdBy: currUser._id,
  });

  currUser.Activity.push(newActivity._id);
  await currUser.save();

  res.status(201).json({
    success: true,
    message: "Activity created successfully",
    newActivity,
  });
});

// ---------------- GET ALL ACTIVITIES OF STUDENT ----------------
export const getAllActivities = catchAsyncErrors(async (req, res, next) => {
  // Sort by createdAt in descending order (newest first)
  const userActivities = await Activity.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    activities: userActivities,
  });
});


// ---------------- GET ALL UNVERIFIED ACTIVITIES (ADMIN) ----------------
export const getAllUnverifiedActivities = catchAsyncErrors(async (req, res, next) => {
  const activities = await Activity.find({ isVerified: false }).populate(
    "createdBy",
    "Name RollNumber email"
  );
  res.status(200).json({ success: true, activities });
});

// ---------------- VERIFY ACTIVITY (ADMIN ONLY) ----------------
export const verifyActivity = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ success: false, message: "Invalid activity id" });
  }

  const currUser = await User.findById(req.user._id);
  if (currUser.role !== "Admin") {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  const activity = await Activity.findById(activityId);
  if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });

  if (activity.isVerified) {
    return res.status(400).json({ success: false, message: "Activity already verified" });
  }

  activity.isVerified = true;
  activity.verifiedBy = currUser._id;
  await activity.save();

  res.status(200).json({
    success: true,
    message: "Activity verified successfully",
    activity,
  });
});

// ---------------- GET ALL VERIFIED ACTIVITIES ----------------
export const getAllVerifiedActivities = catchAsyncErrors(async (req, res, next) => {
  const activities = await Activity.find({ isVerified: true })
    .populate("createdBy", "Name RollNumber email")
    .populate("verifiedBy", "Name RollNumber email");

  res.status(200).json({ success: true, activities });
});

// ---------------- GET ALL ACTIVITIES FOR ADMIN ----------------
export const getAllActivitiesAdmin = catchAsyncErrors(async (req, res, next) => {
  const activities = await Activity.find({})
    .populate("createdBy", "Name RollNumber email")
    .populate("verifiedBy", "Name RollNumber email");

  res.status(200).json({ success: true, activities });
});

// ---------------- GET SINGLE ACTIVITY DETAILS ----------------
export const getSingleActivityDetails = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ success: false, message: "Invalid activity id" });
  }

  const activity = await Activity.findById(activityId)
    .populate("createdBy", "Name RollNumber email")
    .populate("verifiedBy", "Name RollNumber email");

  if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });

  if (activity.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
    return res.status(401).json({ success: false, message: "Not authorized to view" });
  }

  res.status(200).json({ success: true, activity });
});

// ---------------- UPDATE ACTIVITY ----------------
export const updateActivity = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ success: false, message: "Invalid activity id" });
  }

  const activity = await Activity.findById(activityId);
  if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });

  if (activity.createdBy.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
    return res.status(401).json({ success: false, message: "Not authorized to update" });
  }

  if (activity.isVerified) {
    return res.status(400).json({ success: false, message: "Cannot update verified activity" });
  }

  const { type, title, description } = req.body;

  if (type) {
    if (!activityTypes.includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid activity type" });
    }
    activity.type = type;
  }

  if (title) activity.title = title;
  if (description) activity.description = description;

  if (req.files && req.files.image) {
    const { image } = req.files;
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "SIH_2025_activity_proofs",
      });
      activity.proof = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({ success: false, message: "Failed to upload image" });
    }
  }

  await activity.save();
  res.status(200).json({ success: true, message: "Activity updated successfully", activity });
});

// ---------------- DELETE ACTIVITY ----------------
export const deleteActivity = catchAsyncErrors(async (req, res, next) => {
  const { activityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ success: false, message: "Invalid activity id" });
  }

  const activity = await Activity.findById(activityId);
  if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });

  if (activity.isVerified) {
    return res.status(400).json({ success: false, message: "Cannot delete verified activity" });
  }

  const currUser = await User.findById(req.user._id);
  if (currUser.role !== "Admin" && activity.createdBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ success: false, message: "Not authorized to delete" });
  }

  // Delete image from Cloudinary
  if (activity.proof && activity.proof.public_id) {
    await cloudinary.uploader.destroy(activity.proof.public_id);
  }

  await activity.remove();
  currUser.Activity = currUser.Activity.filter(actId => actId.toString() !== activityId.toString());
  await currUser.save();

  res.status(200).json({ success: true, message: "Activity deleted successfully" });
});
