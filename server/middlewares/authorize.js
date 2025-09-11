
// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const protectRoute = async (req, res, next) => {
//   const { token } = req.cookies;
//   const userEmail = jwt.verify(token, "VoiceFlow");

//   const user = await User.findOne({
//     email: userEmail.email,
//   });

//   if (user) next();
//   else res.json({ success: false, message: "UnAuthorized Access" });
  
// };



import jwt from "jsonwebtoken";

// Simple authentication middleware - only checks if user is logged in
const protectRoute = (req, res, next) => {
  try {
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Please log in to access this resource" 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request object (userId, email from JWT)
    req.user = decoded;
    
    // User is authenticated, proceed to next middleware/route
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token. Please log in again." 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Session expired. Please log in again." 
      });
    }
    
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export default protectRoute;