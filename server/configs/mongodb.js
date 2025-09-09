import mongoose from "mongoose";

//connect:

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connection Established");
  });

  await mongoose.connect(`${process.env.MONGO_URI}/tts-stt`);
};

export default connectDB