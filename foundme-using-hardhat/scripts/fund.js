async function fund() {
  const fundMe = await ethers.getContract("FundMe");
  console.log("Funding contract...");
  const fundTxResponse = await fundMe.fund({
    value: ethers.parseEther("0.1"),
  });
  await fundTxResponse.wait(1);
  console.log("Funded.");
}
fund()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
