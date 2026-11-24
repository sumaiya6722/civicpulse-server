
import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully through Mongoose!");
    console.log("Connected database:", mongoose.connection.name);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

// Get the native MongoDB database connection
export const getNativeDb = () => {
  if (!mongoose.connection.db) {
    throw new Error("MongoDB connection is not ready.");
  }

  return mongoose.connection.db;
};
