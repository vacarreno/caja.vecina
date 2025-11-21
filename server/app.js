import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import adminRoutes from "./routes/adminRoutes.js";
import vecinoRoutes from "./routes/vecinoRoutes.js";
import comercioRoutes from "./routes/comercioRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import transaccionRoutes from "./routes/transaccionRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => res.json({ message: "Backend Operativo" }));

app.use("/admin", adminRoutes);
app.use("/vecinos", vecinoRoutes);
app.use("/comercios", comercioRoutes);
app.use("/qr", qrRoutes);
app.use("/transacciones", transaccionRoutes);

export default app;
