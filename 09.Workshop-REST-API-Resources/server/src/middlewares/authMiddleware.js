import jwt from 'jsonwebtoken';
const secret = "MYSECRET";

export const authMiddleware = (req, res, next)=>{
const token = req.header('x-authorization');
if(!token){
    return next();
}
try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
} catch (err) {
    res.status(401).end();
}

}