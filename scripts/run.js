const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
   
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by  owner by address:", owner.address);
    console.log("Random address",randomPerson.address);
   
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
   
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
   
    waveCount = await waveContract.getTotalWaves();


    console.log("Our total waves after the wave:",waveCount);
    waveTxn = await waveContract.connect(randomPerson).wave();
    console.log("Random Addreess",waveTxn.address);
    
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