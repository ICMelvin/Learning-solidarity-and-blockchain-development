export const config = {
  accounts: {
    deployer: { default: 0 },
    user: { default: 1 },
  },
};

// This file tells rocketh which "extensions" (extra abilities) to load.
// @rocketh/deploy gives you the `deploy()` function used in your deploy scripts.
import * as deployExtension from "@rocketh/deploy";
const extensions = {
  ...deployExtension,
};
export { extensions };
