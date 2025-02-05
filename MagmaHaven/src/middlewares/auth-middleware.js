import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];
  if (!token) {
   return next();
  }
  try {
    const decodedToken = await jwt.verify(token, secret);
    req.user = decodedToken;
    req.isAuthenticated = true;
    res.locals.user = decodedToken;
    return next();
  } catch (error) {
    res.clearCookie("auth");
    return res.redirect("/auth/login");
  }
};
