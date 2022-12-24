import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import uploadFile from "./s3.js";
import fs from "fs";
import util from "util";
import FileModel from "./models/file.js";

//function to make deleting files easier
const unlinkFile = util.promisify(fs.unlink);

const app = express();

const upload = multer({ dest: "uploads/" });
const dbUrl = process.env.DB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(dbUrl)
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());

//respond with all files stored in database
app.get("/uploads", async (req, res) => {
  const files = await FileModel.find();

  res.json(files);
});

//upload a file to a database
app.post("/uploads", upload.single("file"), async (req, res) => {
  
  //uploads a file to a AWS bucket
  const fileInfo = await uploadFile(req.file);

  //deletes a file from a local storage
  await unlinkFile(req.file.path);

  const newFile = new FileModel({
    url: fileInfo.Location,
  });

  //saves a file url in a database
  await newFile.save();

  res.json("Upload success");
});

app.listen(3000, () => console.log("Server listening..."));
