import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
  },
  server: {
    host: "0.0.0.0", // **Adicione esta linha**
    port: 5173, // Opcional: Especifique a porta, se não, usará a padrão (5173)
  },
});
