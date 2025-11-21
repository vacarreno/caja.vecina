import { Router } from "express";
import { login } from "../controllers/comercioController.js";

const r = Router();
r.post("/login", login);

export default r;
