import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connection Established");
    });

    mongoose.connection.on("error", (err) => {
      console.log("DB connection error:", err);
    });

    // Remove the `/tts-stt` from here since it's now in the URI
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
