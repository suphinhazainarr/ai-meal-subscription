const jwt = require("jsonwebtoken");

const authMiddleware = ( req, res , next ) => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message:"Access denied . no token provided."})
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Add user data to req
            next();
          } catch (err) {
            res.status(403).json({ message: "Invalid or expired token" });
          } 
}
module.exports = authMiddleware;
