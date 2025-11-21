import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Parche para react-qr-scanner
const externals = [
  "@babel/runtime/helpers/extends",
  "@babel/runtime/helpers/objectWithoutPropertiesLoose",
  "@babel/runtime/helpers/objectWithoutProperties"
];

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-qr-scanner"]
  },
  build: {
    rollupOptions: {
      external: externals
    }
  },
  publicDir: "public",
  outDir: "dist"
});
