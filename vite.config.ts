import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    port: 5173, // Port for development server
  },
  preview: {
    port: 5173, // Port for preview server
  },
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
  base: "/", // Ensure correct base URL for deployment
});
