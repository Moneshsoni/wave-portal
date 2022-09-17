const main = async () => {
  const [deployer] = await hre.ethers.getSigners(); 
  const accountBalance  = await deployer.getBalance()

  console.log("Deploying contract with address account!",deployer.address);
  console.log("Account Balance ",accountBalance.toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
 
  console.log("waveContract deployed to:", waveContract.address);
 

};
 
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
 
runMain();
//contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3