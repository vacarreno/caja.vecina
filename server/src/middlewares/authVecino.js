import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export default function authVecino(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET_VECINO);
    req.vecino = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
