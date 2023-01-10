import ora from "ora";

const config = {
  color: "gray",
  spinner: "point",
};

const spinner = ora(config);

export { spinner };
