import { verifyToken } from "../utils/jwt.js";

export function isLoggedIn(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new Error("You must be logged in to upload beats");
  }

  const token = auth.split(" ")[1];

  verifyToken(token);

  next();
}
