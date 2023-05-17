import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map, //typically you use an object, but this is a Map bc that's how mongodb saves it
      of: Boolean, //all we need to do is check if user id exists in this map and the value will be true always if it exists. if you like it, you will add to the map, if you don't like it, you will remove that map. The reason we didn't use an array bc map is more efficient and performant
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;