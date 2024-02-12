import express from 'express';
import mongoose from 'mongoose';
import listingRouter from './routes/listing.route.js'
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
}).catch((err) => {
  console.log(err);
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use("/server/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});