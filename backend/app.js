import express from 'express';
const app=express();
///for configuration with .env file in config folder
import {config} from 'dotenv';
config({
    path:"./config/config.env"
});
import cors from 'cors';
const allowedOrigins = [
    //   'https://your-frontend-domain-1.com',
      'http://localhost:5173' // Example for local development
    //   'https://another-allowed-domain.net'
    ];

    // Configure CORS options
    const corsOptions = {
      origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
      credentials: true // Allow cookies or other credentials to be sent
    };

    // Apply the CORS middleware globally with the defined options
    app.use(cors(corsOptions));
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