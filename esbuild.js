#!/usr/bin/env node
const esbuild = require('esbuild');
const cssModulesPlugin = require("esbuild-css-modules-plugin");

require("esbuild")
  .build({
    external: ["react", "react-dom", "react", "react-contenteditable", "react-popper", "react-table", "react-window"],
    logLevel: "info",
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    target: "es2020",
    format: "cjs",
    bundle: true,
    plugins: [cssModulesPlugin({
      inject: "#root",
      v2: true
    })],
    jsx: "transform",
  })
  .catch(() => process.exit(1));
