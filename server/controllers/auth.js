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

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; //grab email and password when user trys to log in
    const user = await User.findOne({ email: email }); //use mongoose to try to find the one that has this email
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password); //this checks is password enters matches. uses same salt encryption to determine if same hash
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    //give user json web token and give them secret string that we have in .env file - note, that string can be anything i want
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; //delete the password so it doesn't get sent back to front end
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Note, when have a bigger company you either a)have another company pretty much do all the authentication for you bc it's really important and there are lots of ways to hack what we have, or b) have a dedicated team to this. What we have hear is the basic way to do authentication