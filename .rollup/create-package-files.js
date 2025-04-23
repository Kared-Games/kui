import fs from "fs";
import path from "path";
import * as glob from "glob";
import { fileURLToPath } from "url";

// ----------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * Function to create the necessary files for publication
 */
function createPackageFiles() {
  return {
    name: "create-package-files",
    writeBundle: async () => {
      // Read the main package.json
      const pkg = JSON.parse(
        fs.readFileSync(path.join(rootDir, "package.json"), "utf-8")
      );

      // Check if the required fields are present
      const requiredFields = {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        license: pkg.license,
        repository: pkg.repository,
        keywords: pkg.keywords,
        main: pkg.main,
        module: pkg.module,
        types: pkg.types,
        dependencies: pkg.dependencies,
        engines: pkg.engines,
        peerDependencies: pkg.peerDependencies,
      };

      for (const [fieldNames, isValid] of Object.entries(requiredFields)) {
        if (!isValid) {
          throw new Error(`Package ${fieldNames} is required`);
        }
      }

      // Find all index.js files in dist
      const builtFiles = glob.sync("dist/**/index.js");

      // Generate the exports automatically
      const generatedExports = {
        "./package.json": "./package.json",
        ".": {
          import: "./index.js",
          types: "./index.d.ts",
        },
      };

      // Create a mapping of components and their paths
      builtFiles.forEach((file) => {
        // Ignore the main index.js file
        if (file === "dist\\index.js") return;

        // Extract the relative path (without dist/ and without index.js)
        const relativePath = path
          .relative("dist", file)
          .replace(/\\+/g, "/") // Normalize Windows paths
          .replace(/\/index\.js$/, "");

        if (!relativePath) return;

        // Extract the path parts
        const pathParts = relativePath.split("/");

        // If it's a component in a subfolder (ex: Providers/ThemeProvider)
        if (pathParts.length > 1) {
          // Add the export for the parent folder if it doesn't already exist
          // (ex: ./Providers)
          const parentPath = pathParts[0];
          if (!generatedExports[`./${parentPath}`]) {
            // Check if an index.js exists for this folder
            const parentIndexPath = `dist/${parentPath}/index.js`;
            if (fs.existsSync(parentIndexPath)) {
              generatedExports[`./${parentPath}`] = {
                import: `./${parentPath}/index.js`,
                types: `./${parentPath}/index.d.ts`,
              };
            }
          }

          // Add the export for the component name directly
          // (ex: ./ThemeProvider)
          const componentName = pathParts[pathParts.length - 1];
          generatedExports[`./${componentName}`] = {
            import: `./${relativePath}/index.js`,
            types: `./${relativePath}/index.d.ts`,
          };
        } else {
          // For root components (if any)
          generatedExports[`./${relativePath}`] = {
            import: `./${relativePath}/index.js`,
            types: `./${relativePath}/index.d.ts`,
          };
        }
      });

      // Add a generic export for the cases not covered
      generatedExports["./*"] = {
        import: "./*.js",
        types: "./*.d.ts",
      };

      // Create a package.json for distribution
      const distPkg = {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        license: pkg.license,
        repository: pkg.repository,
        keywords: pkg.keywords,
        main: pkg.main,
        module: pkg.module,
        types: pkg.types,
        sideEffects: false,
        dependencies: pkg.dependencies,
        engines: pkg.engines,
        exports: generatedExports,
        peerDependencies: pkg.peerDependencies,
      };

      // Write the package.json in the dist folder
      fs.writeFileSync(
        path.join(rootDir, "dist/package.json"),
        JSON.stringify(distPkg, null, 2)
      );

      // Copy the LICENSE in the dist folder
      if (!fs.existsSync(path.join(rootDir, "LICENSE"))) {
        throw new Error("LICENSE file not found");
      } else {
        fs.copyFileSync(
          path.join(rootDir, "LICENSE"),
          path.join(rootDir, "dist/LICENSE")
        );
      }

      // Copy the README.md in the dist folder
      if (!fs.existsSync(path.join(rootDir, "README.md"))) {
        throw new Error("README.md file not found");
      } else {
        fs.copyFileSync(
          path.join(rootDir, "README.md"),
          path.join(rootDir, "dist/README.md")
        );
      }

      console.log("Package files prepared for distribution");
    },
  };
}

// ----------------------------------------------------------------------

export default createPackageFiles;
