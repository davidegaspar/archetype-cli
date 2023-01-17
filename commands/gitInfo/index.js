import { simpleGit } from "simple-git";
import { logger } from "../../lib/logger.js";
import { spinner } from "../../lib/spinner.js";
import { sleep } from "../../lib/sleep.js";

import GitMeta from "../../lib/gitMeta.js";

async function gitInfo(options) {
  logger.debug("gitInfo");
  logger.debug({ options });

  const gitMeta = new GitMeta(simpleGit());

  spinner.start("fetching");
  const gitMetadata = await gitMeta.get();
  await sleep(3000); // here just to demonstrate the spinner working
  spinner.stop();

  logger.info(`org: ${gitMetadata.org}`);
  logger.info(`repo: ${gitMetadata.repo}`);
  logger.info(`branch: ${gitMetadata.branch}`);
}

export default gitInfo;
