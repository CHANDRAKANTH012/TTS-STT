// backend/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import ttsRouter from "./routes/tts.js";

const app = express();

// Database connection
await connectDB();

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "TTS App API is running!" });
});

app.use("/api/tts", express.json(), ttsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
