#!/usr/bin/env node

"use strict";

import {} from "./lib/dotenv.js";
import { Command } from "commander";

import { logger } from "./lib/logger.js";
import { getJson } from "./lib/package.js";
import { displayBanner } from "./lib/banner.js";
import gitInfo from "./commands/gitInfo/index.js";
import renderTemplates from "./commands/renderTemplates/index.js";

const program = new Command();

program.showHelpAfterError();

program
  .version(getJson().version, "-v, --version", "output the version")
  .option("-d, --debug", "print debug logs")
  .description("Archetype CLI");

program.on("option:debug", function () {
  if (this.opts().debug) {
    logger.level = "debug";
  }
});

program
  .command("git-info")
  .description("display git information")
  .action((options) => {
    displayBanner("Git Info");
    gitInfo(options);
  });

program
  .command("render-templates")
  .description("Render templates based on user input")
  .option("-o, --outputDir <directory>", "output directory", ".")
  .action((options) => {
    displayBanner("Render templates");
    renderTemplates(options);
  });

program.parse(process.argv);
