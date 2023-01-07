import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
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
    fileSize: 1024 * 1024 * 10,
    files: 1,
  },
});
