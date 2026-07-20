export const config = {
  accounts: {
    deployer: { default: 0 },
    user: {
      default: 1,
      11155111: 0,
    },
  },
};

import * as deployExtension from "@rocketh/deploy";
const extensions = {
  ...deployExtension,
};
export { extensions };
