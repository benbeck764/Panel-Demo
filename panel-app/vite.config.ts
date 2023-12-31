import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      rollupOptions: {},
      chunkSizeWarningLimit: 1000,
    },
    define: {
      "process.env": env,
    },
    plugins: [react(), comlink()],
    worker: {
      plugins: [comlink()],
    },
  };
});
