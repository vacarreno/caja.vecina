import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generarToken = (data, secreto, exp = "1d") =>
  jwt.sign(data, secreto, { expiresIn: exp });
