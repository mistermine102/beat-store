import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new Error("File is not of a correct type"), false);
  }
};

export default multer({
  dest: "uploads/",
  fileFilter,
  limits: {
    fileSize: 10000000000,
    files: 1,
  },
});
