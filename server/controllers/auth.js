import bcrypt from "bcrypt"; //allow us to encrypt our password
import jwt from "jsonwebtoken"; //allow us a way to send a user a web token that they can use for authorization
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => { //this has to be asyncronous bc we're calling mongo database which is kinda like an api call. req is what we get, and res is what we send back - express provides this through default
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; //we're basically destructuring these parameters from the req.body. So on front end, we're gonna have to send an object that has these parameters/arguments in them.

    const salt = await bcrypt.genSalt(); //this creates encryption that we can use for our password below
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), //this is just dummy data - could write this functionality for audio project
      impressions: Math.floor(Math.random() * 10000), //dummy data
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Note, the way this register function will work is we're gonna encrypt the password, save it, then after we save it, when user tries to log in, they're gonna provide the password, we're gonna salt it again, and we're gonna make sure that's the correct one and give them a json web token