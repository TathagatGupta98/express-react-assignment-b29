import mongoose from "mongoose";

export const connectDb = async () => {
  try {    
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to the MONGODB successfully");

  } catch (error) {
    console.error("Error connecting to the MONGODB:", error);
    process.exit(1);
}
};

