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

/* FILE STORAGE */
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

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));