import fs from "fs";

// import { getPackageJson } from './getPackageJson.js';
import { logger } from "./logger.js";

function saveAnswers(inputs) {
  const answersMap = {
    // BLUEPRINTS_VERSION: getPackageJson().version,
    TENANT_NAME: inputs.tenantName,
    TENANT_PREFIX: inputs.tenantPrefix,
    APP_NAME: inputs.appName,
    APP_TYPE: inputs.appType && inputs.appType.index,
    GITHUB_ORG: inputs.githubOrg,
    GITHUB_REPO: inputs.githubRepo,
    DEFAULT_BRANCH: inputs.defaultBranch,
    CODE_DIR: inputs.codeDir,
    INFRA_DIR: inputs.infraDir,
    DOCKERFILE: inputs.dockerfile && inputs.dockerfile.index,
    NODEJS_VERSION: inputs.nodejsVersion,
    PYTHON_VERSION: inputs.pythonVersion,
    JAVA_VERSION: inputs.javaVersion,
    CUSTOMISE_HELM_VALUES: inputs.customiseHelmValues,
  };

  logger.debug({ answersMap });

  let content = "";

  for (const item in answersMap) {
    content += `${item}=${answersMap[item] || process.env[item] || ""}\n`;
  }

  try {
    fs.writeFileSync(".blueprints", content);
    logger.debug(".blueprints saved");
  } catch (err) {
    logger.error(err);
  }
}

export { saveAnswers };
