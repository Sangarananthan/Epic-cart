import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
export const  connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Succesfully connected!!..");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
