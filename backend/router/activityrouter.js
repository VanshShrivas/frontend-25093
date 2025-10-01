import {
  createActivity,
  getAllActivities,
  getAllUnverifiedActivities,
  verifyActivity,
<<<<<<< HEAD
  // getAllVerifiedActivities,
  // getAllActivitiesAdmin,
=======
  getAllVerifiedActivities,
  getAllActivitiesAdmin,
>>>>>>> 6dd9dee3ca97462f2410e50fc40ccd69759d2000
  getSingleActivityDetails,
  updateActivity,
  deleteActivity, 
}from "../controllers/activitycontroller.js";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();

router.post("/createactivity",isAuthenticated,createActivity);
router.get("/getallactivities",isAuthenticated,authorizeRoles("Student"),getAllActivities);
<<<<<<< HEAD
router.get("/getallunverifiedactivities",isAuthenticated,authorizeRoles("Admin"),getAllUnverifiedActivities);
router.put("/verifyactivity/:id",isAuthenticated,authorizeRoles("Admin"),verifyActivity);
//router.get("/getallverifiedactivities",isAuthenticated,authorizeRoles("Admin"),getAllVerifiedActivities);
//router.get("/getallactivitiesadmin",isAuthenticated,authorizeRoles("Admin"),getAllActivitiesAdmin);
=======
router.get("/getallunverifiedactivities",authorizeRoles("Admin"),getAllUnverifiedActivities);
router.put("/verifyactivity/:id",isAuthenticated,authorizeRoles("Admin"),verifyActivity);
router.get("/getallverifiedactivities",isAuthenticated,authorizeRoles("Admin"),getAllVerifiedActivities);
router.get("/getallactivitiesadmin",isAuthenticated,authorizeRoles("Admin"),getAllActivitiesAdmin);
>>>>>>> 6dd9dee3ca97462f2410e50fc40ccd69759d2000
router.get("/getsingleactivitydetails/:id",isAuthenticated,getSingleActivityDetails);
router.put("/updateactivity/:id",isAuthenticated,updateActivity);
router.delete("/deleteactivity/:id",isAuthenticated,deleteActivity);
export default router;