import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import routes from "./routes.js";
import { startCronJobs } from "./utils/cron.js";

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use((error, req, res) => {
   const status = error.status || 500;
   const message = error.message;
   res.status(status).json({message: message});
})

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      app.listen(PORT);
      console.log("Server started on port: " + PORT);
      startCronJobs();
   } catch (error) {
      console.log(error.message);
      process.exit(1);
   }
}

connectDB();