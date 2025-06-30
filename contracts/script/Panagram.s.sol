// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {Panagram} from "../src/Panagram.sol";
import {HonkVerifier} from "../src/Verifier.sol";
import {console2} from "lib/forge-std/src/Test.sol";

contract DeployScript is Script {
    uint256 constant FIELD_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    
    function run() external {
        // Usar directamente la cuenta 0 de Anvil
        address deployer = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        
        bytes32 ANSWER = bytes32(uint256(keccak256("triangles")) % FIELD_MODULUS);
        
        console2.log("=== DEPLOYING WITH ANVIL ACCOUNT 0 ===");
        console2.log("deployer address:", deployer);
        console2.log("answer hash:", vm.toString(ANSWER));
        
        vm.startBroadcast(deployerPrivateKey);
        
        HonkVerifier verifier = new HonkVerifier();
        console2.log("verifier address:", address(verifier));
        
        Panagram panagram = new Panagram(verifier);
        console2.log("panagram address:", address(panagram));
        
        panagram.newRound(ANSWER);
        console2.log("new round started with triangles hash");
        
        vm.stopBroadcast();
        
        console2.log("\n=== DEPLOYMENT COMPLETE ===");
        console2.log("Verifier:", address(verifier));
        console2.log("Panagram:", address(panagram));
        console2.log("Owner:", deployer);
    }
}