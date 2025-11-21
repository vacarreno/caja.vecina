import { Router } from "express";
import { crear, obtener } from "../controllers/vecinoController.js";

const r = Router();
r.post("/", crear);
r.get("/:id", obtener);

export default r;
