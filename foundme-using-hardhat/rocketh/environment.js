// This wires up the extensions from config.js into a ready-to-use loader.
// `loadAndExecuteDeploymentsFromFiles` is what your test calls to deploy
// everything in deploy/ and hand you back a queryable `env`.
import { extensions } from "./config.js";
import { setupEnvironmentFromFiles } from "@rocketh/node";

const { loadAndExecuteDeploymentsFromFiles } =
  setupEnvironmentFromFiles(extensions);

export { loadAndExecuteDeploymentsFromFiles };
