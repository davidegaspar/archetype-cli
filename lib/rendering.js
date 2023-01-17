import fs from "fs";
import path from "path";
import readdirp from "readdirp";
import ejs from "ejs";
import { logger } from "./logger.js";
import { getDir } from "../lib/package.js";

function removeDuplicateQueueItems(queue) {
  const unique = [];
  return queue.filter(function (item) {
    if (unique.includes(item.outputFile)) {
      return false;
    } else {
      unique.push(item.outputFile);
      return true;
    }
  });
}

async function generateQueue(baseUrl, { inputs, accounts, envs }) {
  logger.debug({ inputs, accounts, envs });
  const items = [];
  const templatesDir = `${getDir(baseUrl)}/templates`;

  for await (const entry of readdirp(templatesDir)) {
    logger.debug({ entry });
    // for (const env in envs) {
    //   items.push({
    //     template: `${templatesDir}/${entry.path}`,
    //     outputFile: ejs.render(entry.path, { inputs, env: envs[env] }),
    //     data: { inputs, accounts, envs, env: envs[env] },
    //   });
    // }
  }
  return removeDuplicateQueueItems(items);
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logger.debug({ createDir: dir });
  }
}

function render(queue, outputDir) {
  queue.forEach((item) => {
    const directory = `${outputDir}/${path.dirname(item.outputFile)}`;
    createDir(directory);

    ejs.renderFile(item.template, item.data, {}, (err, str) => {
      if (err) {
        throw err;
      }
      fs.writeFileSync(`${outputDir}/${item.outputFile}`, str);
      logger.info(`✔ ${outputDir}/${item.outputFile}`);
    });
  });
}

export { generateQueue, render };
