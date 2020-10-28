import { app } from "./app";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { DatabaseConnectionError } from "./errors/database-connection-error";
dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT key must be defined!");
    }
    if (!process.env.MONGO_URI) {
      throw new DatabaseConnectionError();
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`App listening at port :: ${PORT} !!`);
    });
  } catch {
    console.log("Failed to launch app");
  }
};
start();
