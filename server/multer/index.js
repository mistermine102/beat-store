import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new Error("File is not of a correct type"), false);
  }
};

export default multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024*1024*8,
    files: 1,
  },
});
