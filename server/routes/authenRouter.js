// import express from "express";
// import User from "../models/user.js";
// import axios from "axios";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';

// const authenRouter = express.Router();

// authenRouter.post("/register", (req, res) => {
//   const { name, email, password } = req.body;

//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, async (err, hash) => {
//       const user = await User.create({
//         name,
//         email,
//         password:hash,
//       });
//     });
//   });

//   const token = jwt.sign({email},"VoiceFlow");


//   res.cookie("token",token);
//   res.json({success:true,message:"user created successfully"});


// });


// authenRouter.post('/logout',(req,res)=>{
//     res.cookie("token","");
//     res.json({success:true,message:"user logged out"});
// })


// authenRouter.post('/login',async(req,res)=>{
//     const {email, password } = req.body;
//     const user = await User.findOne({
//         email
//     })
//     if(!user) return res.json({success:false,message:"User not found"})
    
//     bcrypt.compare(password, user.password ,function(err, result){
//         if(result){
//             const token = jwt.sign({email:user.email},"VoiceFlow");
//             res.cookie("token",token);
//             return res.json({success:true,message:"User login successfull"})
//         }
//         else{
//             return res.json({success:false,message:"User login failed"})
//         }
//     });

// })

// export default authenRouter;



import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const authenRouter = express.Router();

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('name').trim().isLength({ min: 2, max: 50 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Helper function for cookie options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});

authenRouter.post("/register", registerValidation, async (req, res) => {
  try {
    
    

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password (using async/await for better control)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set secure cookie
    res.cookie("token", token, getCookieOptions());

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

authenRouter.post('/login', loginValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials" // Don't reveal if email exists
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set secure cookie
    res.cookie("token", token, getCookieOptions());

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

authenRouter.post('/logout', (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default authenRouter;