import uploadFile from "../s3.js";
import FileModel from "../models/file.js";
import unlinkFile from "../utils/unLinkFile.js";

export const index = async (req, res) => {
  const files = await FileModel.find();
  res.json(files);
};

export const newUpload = async (req, res) => {
  //uploads a file to a AWS bucket
  const fileInfo = await uploadFile(req.file);

  //deletes a file from a local storage
  await unlinkFile(req.file.path);

  const newFile = new FileModel({
    url: fileInfo.Location,
    author: req.user,
  });

  //saves a file url in a database
  await newFile.save();

  res.json("Upload success");
};
