import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  //Get token from the cookie
  const token = req.cookies["auth"];
  //Don't forget guest users

  if (!token) {
    return next();
  }
  //validate token
  try {
    const decodedToken = jwt.verify(token, SECRET);
    //Attach decoded token to req
    req.user = decodedToken;
    next();
  } catch (err) {
    //TODO: invalid token
  }
};
