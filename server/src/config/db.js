import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

export const db = new Pool({
  connectionString: ENV.DB_URI,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log("PostgreSQL conectado ✔"))
  .catch((err) => console.error("Error DB:", err));
