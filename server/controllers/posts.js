import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [], //**eventually going to want to have another schema or model for this bc it will have it's own likes and dislikes, etc.
    });
    await newPost.save();

    const post = await Post.find(); //after saving post, make sure we can grab all the posts to send below to front end bc once we add the post above, we need all the posts to be sent to the front end so that the front end has the updated list of all posts (which is including the one just created above)
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId); //if userid exists for that posts likes, that means that user likes the post

    if (isLiked) {
      post.likes.delete(userId); //deletes if already exists - not sure why? -> maybe this is bc user has already liked it so pressing button again to unlike
    } else {
      post.likes.set(userId, true); //sets it if doesn't exist
    }

    //how we update a specific post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes }, //list of likes that we modified
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};