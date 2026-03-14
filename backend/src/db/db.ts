import mongoose from "mongoose";

const connectDB = async (url: string) => {
  if (!url) throw new Error("MONGO_URL is not defined.");

  try {
    await mongoose.connect(url);
    console.log(`MongoDB connected successfully.`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
