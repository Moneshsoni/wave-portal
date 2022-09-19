// SPDX-License-Identifier: UNLICENSED
 
pragma solidity ^0.8.0;
 
import "hardhat/console.sol";
 
contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;
 
    struct Wave{
        address sender;
        string message;
        uint timestamp;
    }

    Wave[]  waves;
    constructor() payable{
        console.log("Yo yo, Hello I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty)%100;
    }
 
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender,_message);

        waves.push(Wave(msg.sender,_message, block.timestamp));
        console.log("Recived a new messages: %s",_message);
        uint256 prizeAmount = 0.01 ether;
        seed = (block.timestamp + block.difficulty + seed)%100;
        if(seed <= 50){
            console.log("%s has won !",msg.sender);
            require(prizeAmount<= address(this).balance,"Trying to withdraw more money than contract"); 
            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            require(success,"Failed withdraw money from the contract");

        }
        
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
 
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}