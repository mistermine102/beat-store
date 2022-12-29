export function isLoggedIn(req, res, next) {
  console.log(req.headers.authorization);
  next();
}
