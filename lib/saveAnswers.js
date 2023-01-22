import fs from "fs";
import { logger } from "./logger.js";
import { getJson } from "./package.js";

const filename = ".arc";

function saveAnswers(inputs) {
  const answersMap = {
    VERSION: getJson().version,
    BOUNDED_CONTEXT_ID: inputs.boundedContextId,
    APP_NAME: inputs.appName,
    ENVS_DIR: inputs.envsDir,
  };

  logger.debug({ answersMap });

  let content = "";

  for (const item in answersMap) {
    content += `${item}=${answersMap[item] || process.env[item] || ""}\n`;
  }

  try {
    fs.writeFileSync(filename, content);
    logger.debug(`${filename} saved`);
  } catch (err) {
    logger.error(err);
  }
}

export { saveAnswers };
