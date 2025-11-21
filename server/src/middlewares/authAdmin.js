import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export default function authAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET_ADMIN);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
