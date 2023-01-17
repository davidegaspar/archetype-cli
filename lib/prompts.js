import { logger } from "./logger.js";

function onCancel(prompt, answers) {
  logger.debug({ prompt, answers });
  process.exit(1);
}

export { onCancel };
