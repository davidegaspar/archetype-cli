import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function getDir() {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  return dirname;
}

function getJson() {
  const packageJsonFile = `${getDir()}/../package.json`;
  const packageJsonRaw = fs.readFileSync(packageJsonFile);
  const packageJson = JSON.parse(packageJsonRaw);
  return packageJson;
}

export { getDir, getJson };
