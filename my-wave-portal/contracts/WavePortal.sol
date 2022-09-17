// SPDX-License-Identifier: UNLICENSED
 
pragma solidity ^0.8.0;
 
import "hardhat/console.sol";
 
contract WavePortal {
    uint256 totalWaves;
 
    struct Wave{
        address sender;
        string message;
        uint timestamp;
    }

    Wave[]  waves;
    constructor() {
        console.log("Yo yo, Hello I am a contract and I am smart");
    }
 
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender,_message);

        waves.push(Wave(msg.sender,_message, block.timestamp));
        console.log("Recived a new messages: %s",_message);
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
 
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}