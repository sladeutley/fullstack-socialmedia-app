import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); //this is just gonna take every single post that exists in database and give you every single one - eventually will need one for all posts of people user is friends with. And then super stretch goal is to have one (in addition to user's friends posts) that uses AI for algorithm to curate to user a feed
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;