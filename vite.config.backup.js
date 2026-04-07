import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  root: path.resolve(__dirname, "client"),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client", "index.html"),
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
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
      },
    },
  };
});
