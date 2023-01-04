import { logger } from "./logger.js";

export const onCancel = (prompt, answers) => {
  logger.debug({ prompt, answers });
  process.exit(1);
};
