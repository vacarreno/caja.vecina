export default function rateLimit(req, res, next) {
  res.setHeader("X-RateLimit", "enabled");
  next();
}
