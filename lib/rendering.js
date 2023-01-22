import fs from "fs";
import path from "path";
import readdirp from "readdirp";
import ejs from "ejs";
import { logger } from "./logger.js";

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

async function generateQueue(templatesDir, loopList, metadata) {
  logger.debug({ templatesDir, loopList, metadata });
  const queue = [];

  for await (const entry of readdirp(templatesDir)) {
    logger.debug({ entry });
    for (const index in loopList) {
      const loopItem = loopList[index];
      queue.push({
        template: `${templatesDir}/${entry.path}`,
        outputFile: ejs.render(entry.path, { ...metadata, loopItem }),
        data: { ...metadata, loopItem }, // TBD: do we need loopList?
      });
    }
  }
  return removeDuplicateQueueItems(queue);
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
