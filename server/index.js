import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import uploadsRoutes from "./routes/uploads.js";
import userRoutes from "./routes/user.js";

const app = express();
const dbUrl = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbUrl)
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", uploadsRoutes);
app.use("/", userRoutes);

app.use('*', (req, res) => {
  res.status(404).send("Page not found")
})

app.use((err, req, res, next) => {
  console.log("Generic error handler runs...", err.message);
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json(message);
});

app.listen(3000, () => console.log("Server listening..."));
