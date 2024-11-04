import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { resolve } from "path";
import { readFile } from "fs";
import { delay, defer } from "lodash-es";
import { visualizer } from "rollup-plugin-visualizer";
import shell from "shelljs";
import hooks from "./hooksPlugin";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyle() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyle, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
  // try {
  //   readFileSync("./dist/umd/index.css.gz");
  //   shell.cp("./dist/umd/index.css", "./dist/index.css");
  // } catch (_) {
  //   delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  // }
}

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.umd.html",
    }),
    compression({
      include: /.(cjs|css)$/i,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
    hooks({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyle,
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "../index.ts"),
      name: "ClifforUI",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          return assetInfo.name as string;
        },
      },
    },
  },
});
