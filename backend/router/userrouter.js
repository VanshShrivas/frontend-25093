import {
  createAdminUser,
  createStudentUser,
  loginuser,
  getAllStudents,
  getuserdata,
  logout
} from "../controllers/usercontroller.js";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();    
router.post("/createadminuser",isAuthenticated,authorizeRoles("SuperAdmin"),createAdminUser);
router.post("/createstudentuser",isAuthenticated,authorizeRoles("[SuperAdmin Admin]"),createStudentUser);
router.post("/login",loginuser);
router.get("/logout",isAuthenticated,logout);
router.get("/getallstudents",isAuthenticated,authorizeRoles("[Admin SuperAdmin]"),getAllStudents);
router.get("/getuserdata/:id",isAuthenticated,getuserdata);
export default router;