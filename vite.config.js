import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const rootNodeModules = fileURLToPath(new URL("./node_modules/", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react()],
  publicDir: false,
  resolve: {
    alias: [
      { find: /^react$/, replacement: `${rootNodeModules}react` },
      { find: /^react-dom$/, replacement: `${rootNodeModules}react-dom` },
      { find: /^@mantine\/core/, replacement: `${rootNodeModules}@mantine/core` },
      { find: /^@mantine\/hooks/, replacement: `${rootNodeModules}@mantine/hooks` },
    ],
    dedupe: ["react", "react-dom"],
  },
});
