
import mongoose from "mongoose";
// require("dotenv").config();

let isConnected = false;
const uri = process.env.MONGO_URI;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    console.log("uri: " + uri);
    await mongoose.connect(
      "mongodb+srv://ericmarvelboy:123123123@newblog.kxawstz.mongodb.net/?retryWrites=true&w=majority&appName=newblog",
      {
        dbName: "newblog",
        useNewURLParser: true,
        useUnifiedTopology: true,
      }
    );

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
