import { Router } from "express";
import { generarQR, validarQR } from "../controllers/qrController.js";

const router = Router();

router.get("/:vecino_id", generarQR);
router.post("/validar", validarQR);

export default router;
