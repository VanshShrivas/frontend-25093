import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/UserSchema.js";
import { Activity } from "../models/ActivitySchema.js";
dotenv.config();
export const connection = ()=> {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "SIH_PROJECT_DATABASE",
    })
    .then(async () => {
      console.log("Connected to database.");
      const obj=await User.find();
      const obj2=await Activity.find();
      console.log(obj);
      console.log(obj2);
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};
