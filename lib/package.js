import fs from "fs";
import { getDirname } from "./moduleUtils.js";

function getJson() {
  const packageJsonFile = `${getDirname(import.meta.url)}/../package.json`;
  const packageJsonRaw = fs.readFileSync(packageJsonFile);
  const packageJson = JSON.parse(packageJsonRaw);
  return packageJson;
}

export { getJson };
