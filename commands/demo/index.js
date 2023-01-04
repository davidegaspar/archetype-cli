import prompts from "prompts";

import { logger } from "../../lib/logger.js";
import { onCancel } from "../../lib/prompts.js";
// import { hydrateAccounts } from "../../lib/boundaryKit.js";
// import { renderFiles, generateRenderQueue } from "../../lib/rendering.js";
// import { getEnvs } from "../../lib/envs.js";
import { saveAnswers } from "../../lib/saveAnswers.js";
// import accounts from "../../lib/accounts.js";
import questions from "./questions.js";

async function demo(options) {
  logger.debug("demo");
  logger.debug({ options });

  // const envs = getEnvs(accounts);
  // logger.debug({ envs });

  // const inputs = await prompts(questions, { onCancel });
  // logger.debug({ inputs });

  // saveAnswers(inputs);

  // await hydrateAccounts(inputs.boundaryName, accounts);
  // logger.debug("accounts", accounts);

  // const renderQueue = await generateRenderQueue(import.meta.url, {
  //   inputs,
  //   accounts,
  //   envs,
  // });
  // logger.debug({ renderQueue });

  // renderFiles(renderQueue, options.outputDir);

  logger.info("\nSuccessfully rendered all the files!");
}

export default demo;
