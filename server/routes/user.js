import express from "express";
import { register, login } from "../controllers/user.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));

export default router;
