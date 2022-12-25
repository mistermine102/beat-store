import express from "express";
import multer from "multer";
import { index, newUpload } from "../controllers/uploads.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", index);

//upload a file to a database
router.post("/", upload.single("file"), newUpload);

export default router;
