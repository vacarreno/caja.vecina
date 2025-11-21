import { Router } from "express";
import { generar, validar } from "../controllers/qrController.js";

const r = Router();

r.get("/:id", generar);
r.post("/validar", validar);

export default r;
