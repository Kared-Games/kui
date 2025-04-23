import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import * as glob from "glob";
import * as rimraf from "rimraf";
import path from "path";
import { fileURLToPath } from "url";
import createPackageFiles from "./.rollup/create-package-files.js";

// ----------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Delete dist folder before build
rimraf.sync("dist");

// List all index.ts files
const indexFiles = glob.sync("src/**/index.ts");

// Create the configuration for each file found
const createConfig = (input, output, plugins) => ({
  input,
  output: [
    {
      file: output,
      format: "esm",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "@mui/material": "MaterialUI",
        "@emotion/react": "emotionReact",
        "@emotion/styled": "emotionStyled",
      },
    },
  ],
  plugins,
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
    "react-router-dom",
    /^@mui\/.*/,
    /^@emotion\/.*/,
    /^react-dom\/.*/,
  ],
  onwarn: (warning, warn) => {
    // Ignore specific warnings
    if (
      warning.code === "MODULE_LEVEL_DIRECTIVE" &&
      warning.message.includes("use client")
    ) {
      return;
    }
    // Display other warnings normally
    warn(warning);
  },
});

// Common plugins
const commonPlugins = [
  peerDepsExternal({ includeDependencies: true }),
  resolve({
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json", declaration: false }),
  terser({
    // format: {
    //   comments: "some",
    //   beautify: true,
    // },
    // compress: {
    //   passes: 1,
    // },
  }),
];

// Create the configurations for JS and TS
const configs = [];

indexFiles.forEach((file) => {
  // Convert the file path to the output path
  // ex: "src/Navigations/Header/index.ts" -> "Navigations/Header/index"
  const relativePath = path.relative(path.join(__dirname, "src"), file);
  const outputPath = relativePath.replace(/\\/g, "/").replace(/\.ts$/, "");
  const jsOutputPath = `dist/${outputPath}.js`;
  const dtsOutputPath = `dist/${outputPath}.d.ts`;

  // Configuration for the JS
  configs.push(createConfig(file, jsOutputPath, commonPlugins));

  // Configuration for the TS types
  configs.push(
    createConfig(file, dtsOutputPath, [
      dts({
        // respectExternal: true,
        compilerOptions: {
          baseUrl: ".",
          paths: {
            "@/*": ["./src/*"],
          },
        },
      }),
    ])
  );
});

// ----------------------------------------------------------------------

// Add the createPackage plugin to the last configuration
const lastConfig = configs[configs.length - 1];
lastConfig.plugins.push(createPackageFiles());

// ----------------------------------------------------------------------

export default configs;
