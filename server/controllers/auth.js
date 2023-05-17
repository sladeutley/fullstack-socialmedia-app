import bcrypt from "bcrypt"; //allow us to encrypt our password
import jwt from "jsonwebtoken"; //allow us a way to send a user a web token that they can use for authorization
import User from "../models/User.js";