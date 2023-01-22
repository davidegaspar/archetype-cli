import prompts from "prompts";
import { logger } from "../../lib/logger.js";
import { spinner } from "../../lib/spinner.js";
import questions from "./questions.js";
import { onCancel } from "../../lib/prompts.js";
import { generateQueue, render } from "../../lib/rendering.js";
import { getDirname } from "../../lib/moduleUtils.js";
import { saveAnswers } from "../../lib/saveAnswers.js";
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
  logger.debug({ options });

  const inputs = await prompts(questions, { onCancel });
  logger.debug({ inputs });
  saveAnswers(inputs);

  spinner.start("Rendering");
  const templatesDir = `${getDirname(import.meta.url)}/templates`;
  const envsList = generateEnvs(accounts);
  const metadata = { inputs, accounts };
  let queue = await generateQueue(templatesDir, envsList, metadata);
  logger.debug({ queue });
  const renderedFiles = render(queue, options.outputDir);
  spinner.succeed("Rendering complete");
  logger.info(renderedFiles);
}

export default renderTemplates;
