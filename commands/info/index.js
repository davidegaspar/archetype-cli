import prompts from "prompts";
import boxen from "boxen";
import kleur from "kleur";

import infoQuestions from "./infoQuestions.js";

import { logger } from "../../lib/logger.js";
import { onCancel } from "../../lib/prompts.js";
import { getEnvs } from "../../lib/envs.js";
import accounts from "../../lib/accounts.js";

const boxenConfig = {
  borderStyle: "single",
  dimBorder: true,
  padding: {
    top: 0,
    right: 1,
    bottom: 0,
    left: 1,
  },
  margin: {
    top: 1,
    right: 0,
    bottom: 1,
    left: 0,
  },
};

async function info(options) {
  logger.debug("info");
  logger.debug({ options });

  let questions = infoQuestions;

  // try to determine prompt questions from the env, fall back to prompt if not set...
  if (process.env.BOUNDARY_NAME) {
    questions = questions.filter((o) => o.name === "boundaryName");
  }

  if (process.env.APP_NAME) {
    questions = questions.filter((o) => o.name === "appName");
  }

  if (options.prompts) {
    // set questions back to default to force all prompts to appear...
    questions = infoQuestions;
  }

  const infoInputs = await prompts(questions, { onCancel });

  if (!options.prompts && process.env.BOUNDARY_NAME) {
    infoInputs.boundaryName = process.env.BOUNDARY_NAME;
  }

  if (!options.prompts && process.env.APP_NAME) {
    infoInputs.appName = process.env.APP_NAME;
  }

  logger.debug({ infoInputs });

  const envs = getEnvs(accounts);
  logger.debug({ envs });

  console.log("%s: %s", kleur.bold("Boundary Name"), infoInputs.boundaryName);
  console.log("%s: %s", kleur.bold("Application Name"), infoInputs.appName);

  console.log(boxen("Application URLs", boxenConfig));
  printURLs(infoInputs, accounts, applicationURL);

  console.log(boxen("Datadog URLs", boxenConfig));
  printURLs(infoInputs, accounts, datadogURL);

  console.log(boxen("Splunk URLs", boxenConfig));
  printURLs(infoInputs, accounts, splunkURL);

  console.log(boxen("Kubernetes Dashboard URLs", boxenConfig));
  printURLs(infoInputs, accounts, kubeDashboardURL);
}

function printURLs(inputs, accounts, fn) {
  for (const account in accounts) {
    for (const region in accounts[account].regions) {
      console.log(
        "%s: %s",
        kleur.blue().bold(accounts[account].regions[region].env),
        fn(
          inputs.appName,
          inputs.boundaryName,
          accounts[account].regions[region]
        )
      );
    }
  }
}

function applicationURL(appName, boundaryName, region) {
  const cluster = region.cluster;
  return `https://...`;
}

function datadogURL(appName, boundaryName, region) {
  const cluster = region.cluster;

  const dashboardURL = new URL("https://...");

  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 7);

  const dashboardParams = new URLSearchParams({
    tpl_var_cluster_name: cluster,
    tpl_var_kube_deployment: appName,
    tpl_var_boundary_namespace: boundaryName,
    tpl_var_hpa: appName,
    from_ts: fromDate.getTime(),
  });

  dashboardURL.search = dashboardParams;

  return dashboardURL.toString();
}

function splunkURL(appName, boundaryName, region) {
  const cluster = region.cluster;

  const searchURL = new URL("https://...");
  const searchQuery = `index=global-platform source=${cluster}-fluentbit k8s_pod_namespace=${boundaryName} k8s_app_name=${appName}`;
  const searchParams = new URLSearchParams({
    q: searchQuery,
    earliest: "@d",
    latest: "now",
  });

  searchURL.search = searchParams;

  return searchURL.toString();
}

function kubeDashboardURL(appName, boundaryName, region) {
  const cluster = region.cluster;
  return `https://...`;
}

export default info;
