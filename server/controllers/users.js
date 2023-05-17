import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    //need to use Promise.all bc we are going to make multiple api calls to the database
    const friends = await Promise.all( 
      user.friends.map((id) => User.findById(id))
    );
    //make sure it's formatted proper way for the frontend (according to schema)
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); //if friend is included in users friends list, remove them
      friend.friends = friend.friends.filter((id) => id !== id); //remove user from their friend's friend list - *For when do audio app and have it as followers or subscribed or whatever or only certain people with creators accounts can add content, can set up a function where it shows instead of friends, user will show they follow the person, the person will show they're followed by user - might just be able to add in mongoose schema like in friends array object a boolean or string the says followed or follows
    } else {
      user.friends.push(friendId); //if not included add to friend list
      friend.friends.push(id); //here is where instead of having friends maybe have other schema for follower, or (*WHICH I THINK I LIKE BETTER) could also just push a a boolean as well indicating follows: true, but if false, put in followers column
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    //format for schema
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};