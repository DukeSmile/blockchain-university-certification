import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import hre, { ethers } from "hardhat";
import env from "dotenv";
async function main() {
  let deployer: SignerWithAddress;
  [deployer] = await ethers.getSigners();  //??

  // console.log('network: ', hre.network);

  const networkName = hre.network.name

  console.log("Deploying universityCert");
  console.log("Deployer address: ", deployer.address);
  console.log('name: ', networkName);
  const UBCcontract = await ethers.getContractFactory("BUCertification");
  const universityCert = await UBCcontract.deploy(deployer.address);
  await universityCert.deployed();
  console.log("BUCcontract address: ", universityCert.address);
  console.log(
    "universityCert verify: ",
    `npx hardhat verify --contract "contracts/BUCertification.sol:BUCertification" --network bscTestnet ${universityCert.address} ${deployer.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
