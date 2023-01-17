import { validateId } from "../../lib/validation.js";

export default [
  {
    type: "text",
    name: "boundedContextId",
    message: "Bounded context id:",
    initial: process.env.BOUNDED_CONTEXT_ID,
    validate: validateId,
  },
  {
    type: "text",
    name: "appName",
    message: "Application name:",
    initial: process.env.APP_NAME,
    validate: validateId,
  },
];
