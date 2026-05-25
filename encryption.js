const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function Encrypt() {
  let pk = process.env.PRIVATE_KEY?.trim();
  if (!pk.startsWith("0x")) pk = "0x" + pk; // the startsWith() method is used to check if the variable stored starts with the specified parameter string

  const wallet = new ethers.Wallet(pk);
  const encrypted = await wallet.encrypt(process.env.PRIVATE_KEY_PASSW); // just the password

  console.log(encrypted);
  fs.writeFileSync("./.encrypted_key.json", encrypted);
}

Encrypt()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
