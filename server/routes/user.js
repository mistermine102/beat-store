import express from "express";
import { register, login, user } from "../controllers/user.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.get("/user", wrapAsync(user));

export default router;
