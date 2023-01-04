#!/usr/bin/env node

"use strict";

import {} from "./lib/dotenv.js";
import { Command } from "commander";

import { logger } from "./lib/logger.js";
import { getJson } from "./lib/package.js";
import { displayBanner } from "./lib/banner.js";
import demo from "./commands/demo/index.js";
import info from "./commands/info/index.js";

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
  .command("info")
  .description("Get information about the current application")
  .option(
    "-p, --prompts",
    "Force information prompts instead of reading from the current environment"
  )
  .action((options) => {
    displayBanner("Information");
    info(options);
  });

program
  .command("demo")
  .description("Demo")
  .option("-o, --outputDir <directory>", "output directory", ".")
  .action((options) => {
    displayBanner("Demo");
    demo(options);
  });

program.parse(process.argv);
