import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Caja Vecina Backend 2.0 corriendo en puerto ${PORT}`);
});
