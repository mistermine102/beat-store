import { uploadFile, deleteFile } from "../s3.js";
import FileModel from "../models/file.js";
import unlinkFile from "../utils/unLinkFile.js";
import appError from "../utils/AppError.js";
import UserModel from "../models/user.js"

export const index = async (req, res) => {
  const files = await FileModel.find();
  res.json(files);
};

export const newUpload = async (req, res) => {
  if (!req.file) throw new appError(400, "File is empty");

  //uploads a file to a AWS bucket
  const fileInfo = await uploadFile(req.file);

  //deletes a file from a local storage
  await unlinkFile(req.file.path);

  const newFile = new FileModel({
    url: fileInfo.Location,
    author: req.user,
    filename: req.file.filename,
  });

  //Adds a beat to user beats
  const user = await UserModel.findById(req.user._id)
  user.beats.push(newFile);

  //saves a file info and user in a database
  await newFile.save();
  await user.save()

  res.json("Upload success");
};

export const deleteBeat = async (req, res) => {
  const { id } = req.params;

  //delete a reference from database
  const { filename, author } = await FileModel.findByIdAndDelete(id);

  //delete from AWS
  await deleteFile(filename);

  //delete from user beat array ...
  const user = await UserModel.findById(author)

  user.beats = user.beats.filter(el => el != id);

  await user.save()

  res.json(`Deleting beat with an id of ${id}`);
};
