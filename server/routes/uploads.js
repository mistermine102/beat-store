import express from "express";
import { index, newUpload } from "../controllers/uploads.js";
import wrapAsync from "../utils/wrapAsync.js";
import upload from "../multer/index.js";
import { isLoggedIn } from "../middleware/index.js";

const router = express.Router();
router.get("/", wrapAsync(index));
router.post("/", isLoggedIn, upload.single("file"), wrapAsync(newUpload));

export default router;
