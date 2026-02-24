import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 6900,
    proxy: {
      "/t": {
        target: "http://159.65.155.155",
        changeOrigin: true,
      },
      "/dashboard": {
        target: "http://159.65.155.155",
        changeOrigin: true,
      },
    },
  },
});
