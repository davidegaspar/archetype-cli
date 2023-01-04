"use strict";

import { logger } from "./logger.js";

class GitMeta {
  constructor(simpleGit) {
    this.git = simpleGit;
  }

  async get() {
    let remotes;
    try {
      remotes = await this.git.getRemotes(true);
      const origin = remotes.find((element) => element.name === "origin");
      const originURL = origin.refs.fetch;
      const originURLSplit = originURL.split(/[:./]/);
      return {
        org: originURLSplit[originURLSplit.length - 3],
        repo: originURLSplit[originURLSplit.length - 2],
      };
    } catch (error) {
      logger.debug(error);
      return null;
    }
  }
}

export default GitMeta;
