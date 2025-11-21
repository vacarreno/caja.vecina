import { Router } from "express";
import { obtenerPerfil } from "../controllers/vecinoController.js";
const router = Router();

router.get("/:id", obtenerPerfil);

export default router;
