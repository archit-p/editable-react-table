#!/usr/bin/env node
const esbuild = require('esbuild');
const cssModulesPlugin = require("esbuild-css-modules-plugin");

require("esbuild")
  .build({
    external: ["react", "react-dom", "react", "react-contenteditable", "react-popper", "react-table", "react-window"],
    logLevel: "info",
    entryPoints: ["src/index.ts"],
    target: "es2020",
    format: "cjs",
    bundle: true,
    outfile: "dist/index.js",
    plugins: [cssModulesPlugin()],
    jsx: "transform",
  })
  .catch(() => process.exit(1));
