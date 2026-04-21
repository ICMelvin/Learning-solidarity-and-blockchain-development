import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimpStoreModule", (m) => {
  const simpStore = m.contract("SimpStore");
  return { simpStore };
});
