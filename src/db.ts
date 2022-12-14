import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected...".cyan.underline);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
