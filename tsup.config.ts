import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["./src/index.ts"],
    outDir: "./dist",
    format: ["esm"],
    sourcemap: false,
    splitting: true,
    clean: true,
});
