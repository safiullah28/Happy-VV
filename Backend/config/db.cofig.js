import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected to : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting Database : ${error}`);
    process.exit(1);
  }
};
export default connectDB;
