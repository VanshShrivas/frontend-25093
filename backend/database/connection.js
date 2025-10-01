import mongoose from "mongoose";
<<<<<<< HEAD

export const connection = () => {
=======
import dotenv from "dotenv";
import { User } from "../models/UserSchema.js";
dotenv.config();
export const connection = ()=> {
>>>>>>> 6dd9dee3ca97462f2410e50fc40ccd69759d2000
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "SIH_PROJECT_DATABASE",
    })
<<<<<<< HEAD
    .then(() => {
      console.log("Connected to database.");
=======
    .then(async () => {
      console.log("Connected to database.");
      const obj=await User.find();
      console.log(obj);
>>>>>>> 6dd9dee3ca97462f2410e50fc40ccd69759d2000
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};
