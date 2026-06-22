// This file re-exports `deployScript` (the wrapper your deploy scripts use)
// and `artifacts` (compiled contract data your deploy scripts reference).
import { extensions } from "./config.js";

// Re-export artifacts so deploy scripts can do:
//   import { deployScript, artifacts } from "../rocketh/deploy.js";
import * as artifacts from "../generated/artifacts/index.js";
export { artifacts };

import { setupDeployScripts } from "rocketh";
const { deployScript } = setupDeployScripts(extensions);

export { deployScript };
