import path from "path";
import { fileURLToPath } from "url";

function getDirname(url) {
  const filename = fileURLToPath(url);
  const dirname = path.dirname(filename);
  return dirname;
}

export { getDirname };
