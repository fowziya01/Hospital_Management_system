const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach full user details
        req.userId = decoded.userId; // Specifically attach userId for easy access
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};




module.exports = authMiddleware;

