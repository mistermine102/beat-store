import { uploadFile, deleteFile } from "../s3.js";
import FileModel from "../models/file.js";
import unlinkFile from "../utils/unLinkFile.js";
import appError from "../utils/AppError.js";

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

  //saves a file info in a database
  await newFile.save();

  res.json("Upload success");
};

export const deleteBeat = async (req, res) => {
  const { id } = req.params;

  const { filename } = await FileModel.findByIdAndDelete(id);
  await deleteFile(filename);

  res.json(`Deleting beat with an id of ${id}`);
};
