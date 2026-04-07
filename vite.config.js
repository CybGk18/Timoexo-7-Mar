import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";
import compression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  root: path.resolve(__dirname, "client"),
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.65, 0.8], speed: 3 },
      svgo: {
        plugins: [{ name: "removeViewBox", active: false }],
      },
      webp: { quality: 75 },
      avif: { quality: 50 },
    }),
    compression({ algorithm: "brotliCompress" }),
    compression({ algorithm: "gzip" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: path.resolve(__dirname, "client", "index.html"),
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom", "react-router-hash-link"],
          motion: ["framer-motion"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          query: ["@tanstack/react-query"],
          ui: [
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    proxy: {
      '/server': {
        target: 'https://www.t-imoexo.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/server/, '')
      }
    }
  }
});
