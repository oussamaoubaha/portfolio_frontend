import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 5173,
    proxy: {
      "/api": { target: "http://127.0.0.1:8000", changeOrigin: true, secure: false },
      "/storage": { target: "http://127.0.0.1:8000", changeOrigin: true, secure: false },
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion") || id.includes("motion-dom")) return "vendor-motion";
            if (id.includes("react-router") || id.includes("@remix-run")) return "vendor-router";
            if (id.includes("@tanstack/react-query")) return "vendor-query";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("groq-sdk")) return "vendor-groq";
            if (id.includes("lenis")) return "vendor-lenis";
            if (id.includes("lucide-react")) return "vendor-lucide";
            if (id.includes("@fontsource")) return "vendor-fonts";
            if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
            return "vendor-misc";
          }
          if (id.includes("/admin/")) return "admin";
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
}));
