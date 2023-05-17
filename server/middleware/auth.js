import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => { //next parameter allows us to have the function continue
  try {
    let token = req.header("Authorization"); //from the request from frontend, we're grabbing the authorization header, and that's where the front end will be setting this token that we'll be using on backend

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft(); //we want token to be starting with Bearer (which is set on front end) and we are taking everything after that
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); //for middleware, we have to use this 'next' so that the next one will proceed to next step of function
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};