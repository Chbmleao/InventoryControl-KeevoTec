import mongoose, { ConnectOptions, Connection } from "mongoose";

const connectDB = async () => {
  const mongoURI =
    process.env.MONGODB_URL || "mongodb://localhost:27017/inventory-db";
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;

  console.log("Attempting to connect to MongoDB...");

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: username,
      pass: password,
    } as ConnectOptions);

    const db: Connection = mongoose.connection;

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
