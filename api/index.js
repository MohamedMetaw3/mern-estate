import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();
import cors from "cors";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect success to mongodb");
  })
  .catch(() => {
    console.log(error);
  });
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
// app port listening
app.listen(3000, () => {
  console.log("Server is running  on 3000");
});

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Error Middleware Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
 return res.status(statusCode).json({
  success:false,
  message,
  statusCode,
 })
});


