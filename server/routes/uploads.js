import express from "express";
import { index, newUpload, deleteBeat } from "../controllers/uploads.js";
import wrapAsync from "../utils/wrapAsync.js";
import upload from "../multer/index.js";
import { authorizeBeat, isLoggedIn } from "../middleware/index.js";

const router = express.Router();

router.get("/", wrapAsync(index));
router.post("/", isLoggedIn, upload.single("file"), wrapAsync(newUpload));
router.delete("/:id", isLoggedIn, wrapAsync(authorizeBeat), wrapAsync(deleteBeat));

export default router;
