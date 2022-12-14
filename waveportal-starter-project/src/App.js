import React, { useEffect, useState } from "react";
import {ethers} from "ethers";
import "./App.css";
import wavePortalAbi  from "./utils/WavePortal.json";
 
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x3Ec7938346cFf1e6d0C8e6f33CFD4f59283770A4";
  const contractABI = wavePortalAbi.abi;
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
 
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
 
      const accounts = await ethereum.request({ method: "eth_accounts" });
 
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
 
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      } 
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
 
  const wave = async  ()=>{
    try {
      const {ethereum} = window;
      if(ethereum){
        const provider =  new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();  
        const  wavePortalContract = new ethers.Contract(contractAddress, contractABI,signer);

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining transaction ..",waveTxn.hash);
        await waveTxn.wait();
        console.log("Transaction is mined ",waveTxn.hash);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrived total wave count ...",count.toNumber()); 
      }
      
    } catch (error) {
      console.log("Error found on! ",error);
      
    }

  }
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        ???? Hey there!
        </div>
 
        <div className="bio">
          I am Monesh soni and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>
 
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
 
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
 
export default App