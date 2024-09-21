import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";

export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      "@": "/src",
      server: "/src/server",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  build: {
    rollupOptions: {
      input: "./src/server/index.tsx",
    },
  },
});
