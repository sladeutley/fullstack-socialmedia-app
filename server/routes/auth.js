import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); //allows express to identify that these routes will be configured and have them in separate files to keep us organized

router.post("/login", login); //this will actually be 'auth/login' from index.js under routes - not sure how we get authRoutes in index.js though

export default router;