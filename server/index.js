import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Caja Vecina Backend Running on port ${PORT}`);
});
