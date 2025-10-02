import mongoose from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "SIH_PROJECT_DATABASE",
    })
    .then(async () => {
      console.log("Connected to database.");
      const obj=await User.find();
      console.log(obj);
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};
