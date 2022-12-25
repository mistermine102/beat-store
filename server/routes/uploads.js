import express from "express";
import { index, newUpload } from "../controllers/uploads.js";
import wrapAsync from "../utils/wrapAsync.js";
import storage from "../multer/index.js";

const router = express.Router();
const upload = storage;

router.get("/", wrapAsync(index));
router.post("/", upload.single("file"), wrapAsync(newUpload));

export default router;
