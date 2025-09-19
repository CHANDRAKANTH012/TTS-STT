// backend/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import ttsRouter from "./routes/tts.js";
import router from './routes/history.js'
import authenRouter from "./routes/authenRouter.js";
import protectRoute from "./middlewares/authorize.js";
import cookieParser from "cookie-parser";

const app = express();

// Database connection
await connectDB();

// Middlewares
app.use(cors({
  origin: '*', //frontend URL
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "TTS App API is running!" });
});

//navbar status:
app.get("/auth/check", protectRoute, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

app.use('/common-auth',(req,res)=>{
  const {token} = req.cookies;

  if(token) return res.json({success:true})
  else return res.json({success:false})
})

app.use("/api/tts", ttsRouter);
app.use("/api/history",protectRoute ,router);
app.use('/auth', authenRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
