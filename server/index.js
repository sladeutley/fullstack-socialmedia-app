import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
//next two allow us to properly set the paths when we configure directories later on
import path from "path"; //this is a native package that comes with node already
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"; //a route folder where we'll have the paths and routes for every feature - except "/auth/register" below bc we need that in this file bc of it's middleware
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
/* this includes all the middleware (something that runs in between different requests - basically functions that run between requests) configurations as wells as different package configurations */
const __filename = fileURLToPath(import.meta.url); //this configuration is so we can grab the file url and specifically when using module (like how we stated in package.json) and use things like dirname below
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true })); //30mb limit so don't have issue
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //this will invoke our cross-origin resource sharing policies
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //this is setting the directory of where we keep our assets (in our case our images). Note, in a real life production app we would want to store it in an actual store file directory, but in this case we're gonna keep it simple and store it locally

/* FILE STORAGE - *These we will change (i think, definitely routes with files below will) for audio app to use something like cloudinary - look at midjourney dalle project for reference */
// below is how user can save files. For intstance, anytime a user uploads a file to our website, it's gonna be saved into this folder. Note, a lot of these configurations come from their documentation on how to set up
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES - *These we will change for audio app to use something like cloudinary - look at midjourney dalle project for reference */
app.post("/auth/register", upload.single("picture"), register); //if user wants to register, gonna call this api route from front end (the /auth/register part), then we're gonna upload a picture locally into the public/assets folder with middleware - called middleware bc it's inbetween and occurs before our actual logic , aka the register part at end - so it occurs before we reach our end point, the register part (**i wonder if the middleware is where someone could use something like cloudinary if don't wanna do it local). And note, we're going to be creating the register controller as well, which is why we import it above
app.post("/posts", verifyToken, upload.single("picture"), createPost); //once again, need to have the route here bc of middleware that includes picture upload from local file - **WILL NEED TO UPDATE THIS TO SOMETHING LIKE CLOUDINARY BEFORE STARTING AUDIO PROJECT BC WILL NEED USER TO BE ABLE TO UPLOAD IMAGES AND MP3S FROM THEIR COMPUTER

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME - so after you save it once, it'll be added to mongodb, then you wanna comment it out */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));