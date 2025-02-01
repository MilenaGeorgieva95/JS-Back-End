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
    //req.locals, res.locals
    res.locals.user = decodedToken;
    next();
  } catch (err) {
    //invalid token case
    res.clearCookie("auth");
    res.redirect("/auth/login");
  }
};

export const isAuth = (req, res, next) => {
  if(!req.user){
    return res.redirect('/auth/login');
  }
  next();
};
