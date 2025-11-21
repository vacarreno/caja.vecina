import { Router } from "express";
import { registrarTransaccion } from "../controllers/transaccionController.js";

const router = Router();

router.post("/", registrarTransaccion);

export default router;
