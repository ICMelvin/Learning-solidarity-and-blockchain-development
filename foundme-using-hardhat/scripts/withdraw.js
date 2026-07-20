async function withdraw() {
  const fundMe = await ethers.getContract("FundMe");
  console.log("Withdrawing...");
  const withdrawTxResponse = await fundMe.withdraw();
  await withdrawTxResponse.wait(1);
  console.log("Withdrawn.");
}
withdraw()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
