// import { simpleGit } from "simple-git";
import prompts from "prompts";
// import boxen from "boxen";
// import kleur from "kleur";

import { logger } from "../../lib/logger.js";
import questions from "./questions.js";
import { onCancel } from "../../lib/prompts.js";
// import { spinner } from "../../lib/spinner.js";
import { generateQueue, render } from "../../lib/rendering.js";

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

  logger.debug(import.meta.url);

  // generateRenderQueue has to be agnostic from data (inputs, accounts, envs)
  // data has to be passed in through here
  // envs is the loop list that contains all the flattened metadata
  // the rest is static data
  let queue = await generateQueue(import.meta.url, {
    inputs,
    accounts: {},
    envs: [],
  });
  logger.debug({ queue });

  // const queueFilters = [parseDockerfile, filterHelmFile];

  // renderQueue = queueFilters.reduce(
  //   (prevResult, fn) => fn(prevResult, renderInputs),
  //   renderQueue
  // );

  // logger.debug({ renderQueue });

  // renderFiles(renderQueue, options.outputDir);

  // logger.info("\nSuccessfully rendered all the files!");
}

export default renderTemplates;
