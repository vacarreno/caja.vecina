import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "./src/middlewares/rateLimit.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import adminRoutes from "./src/routes/admin.routes.js";
import comercioRoutes from "./src/routes/comercio.routes.js";
import vecinoRoutes from "./src/routes/vecino.routes.js";
import qrRoutes from "./src/routes/qr.routes.js";
import transaccionRoutes from "./src/routes/transaccion.routes.js";

const app = express();
app.use(cors({
  origin: [
    "https://TU_FRONTEND.onrender.com"
  ]
}));
// Seguridad
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors({ origin: "*"}));
app.use(rateLimit);

// Rutas
app.use("/admin", adminRoutes);
app.use("/comercio", comercioRoutes);
app.use("/vecino", vecinoRoutes);
app.use("/qr", qrRoutes);
app.use("/transacciones", transaccionRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;
