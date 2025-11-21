import { Router } from "express";
import { crear } from "../controllers/transaccionController.js";

const r = Router();

r.post("/", crear);

export default r;
