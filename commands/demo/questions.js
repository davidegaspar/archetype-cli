import { simpleGit } from "simple-git";
import GitMeta from "../../lib/gitMeta.js";
// import {
//   validateSimpleName,
//   validateBoundaryPrefix,
// } from "../../lib/validation.js";

const gitMeta = await new GitMeta(simpleGit()).get();

export default [
  {
    type: "text",
    name: "boundaryName",
    message: "Boundary name:",
    initial: process.env.BOUNDARY_NAME,
    // validate: validateSimpleName,
  },
  {
    type: "text",
    name: "boundaryPrefix",
    message: "Boundary prefix:",
    initial: process.env.BOUNDARY_PREFIX,
    // validate: validateBoundaryPrefix,
  },
  {
    type: "text",
    name: "appName",
    message: "Application name:",
    initial: process.env.APP_NAME,
    // validate: validateSimpleName,
  },
  {
    type: "text",
    name: "githubOrg",
    message: "Github org name:",
    initial: process.env.GITHUB_ORG || gitMeta.org,
    // validate: validateSimpleName,
  },
  {
    type: "text",
    name: "githubRepo",
    message: "Github repo name:",
    initial: process.env.GITHUB_REPO || gitMeta.repo,
    // validate: validateSimpleName,
  },
  {
    type: "text",
    name: "infraDir",
    message: "Infrastructure directory:",
    initial: process.env.INFRA_DIR || "infra",
  },
  {
    type: "text",
    name: "defaultBranch",
    message: "Default branch:",
    initial: process.env.DEFAULT_BRANCH || "main",
  },
];
