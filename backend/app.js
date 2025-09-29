import express from 'express';
const app=express();
///for configuration with .env file in config folder
import {config} from 'dotenv';
config({
    path:"./config/config.env"
});
////
import cors from 'cors';
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
///////databse connection
import {connection} from './database/connection.js';
connection();
/////
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

/////
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/////
////file upload--it is alternative of multer
import fileUpload from 'express-fileupload';
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));
/////
import user from './router/userrouter.js';
import activity from './router/activityrouter.js';
app.use("/api/v1/user",user);
app.use("/api/v1/activity",activity);
/////
app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`);
});