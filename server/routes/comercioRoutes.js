import { Router } from "express";
import { loginComercio } from "../controllers/comercioController.js";

const router = Router();

router.post("/login", loginComercio);

export default router;
