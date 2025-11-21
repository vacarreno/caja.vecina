import { Router } from "express";
import {
  loginAdmin,
  crearVecino,
  listarVecinos,
  actualizarVecino,
  asignarSaldo
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = Router();

router.post("/login", loginAdmin);
router.post("/vecinos", authAdmin, crearVecino);
router.get("/vecinos", authAdmin, listarVecinos);
router.put("/vecinos/:id", authAdmin, actualizarVecino);
router.post("/saldo/:id", authAdmin, asignarSaldo);

export default router;
