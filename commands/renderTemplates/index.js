// import { simpleGit } from "simple-git";
import prompts from "prompts";
// import boxen from "boxen";
// import kleur from "kleur";

import { logger } from "../../lib/logger.js";
import questions from "./questions.js";
import { onCancel } from "../../lib/prompts.js";
// import { spinner } from "../../lib/spinner.js";
import { generateQueue, render } from "../../lib/rendering.js";
import { getDirname } from "../../lib/moduleUtils.js";
import accounts from "../../config/accounts.js";

function generateEnvs(accounts) {
  const envs = {};
  for (const account in accounts) {
    for (const region in accounts[account].regions) {
      envs[`${account}-${region}`] = {
        account,
        region,
      };
    }
  }
  return envs;
}

async function renderTemplates(options) {
  logger.debug("renderTemplates");
  logger.debug({ options });

  const inputs = await prompts(questions, { onCancel });
  logger.debug({ inputs });

  // saveAnswers(inputs);

  // spinner.start("fetching");
  // spinner.stop();

  // logger.info(`org: ${gitMetadata.org}`);
  // logger.info(`repo: ${gitMetadata.repo}`);
  // logger.info(`branch: ${gitMetadata.branch}`);

  const templatesDir = `${getDirname(import.meta.url)}/templates`;
  const envsList = generateEnvs(accounts);
  const metadata = { inputs, accounts };
  let queue = await generateQueue(templatesDir, envsList, metadata);
  logger.debug({ queue });

  render(queue, options.outputDir);

  logger.info("\nSuccessfully rendered all the files!");
}

export default renderTemplates;
