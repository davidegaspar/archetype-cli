// import { validateSimpleName } from "../../lib/validation.js";

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
    name: "appName",
    message: "Application name:",
    initial: process.env.APP_NAME,
    // validate: validateSimpleName,
  },
];
