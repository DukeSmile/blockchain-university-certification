import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import Web3 from "web3";
import env from "dotenv";
const { expect } = require("chai");

describe("University Certification", () => {
  let Token;
  let universityCert: Contract,
    deployer: SignerWithAddress,
    donater1: SignerWithAddress,
    donater2: SignerWithAddress,
    fundRaiser1: SignerWithAddress,
    fundRaiser2: SignerWithAddress,
    charity1: SignerWithAddress;

  describe("Deploying BUCertification", () => {
    it("Set accounts", async () => {
      [deployer, donater1, donater2, fundRaiser1, fundRaiser2, charity1] = await ethers.getSigners();
      console.log("deployer: ", deployer.address);
    });
    it("Deployed university certification contract", async () => {
      console.log("Deploying BUCertification");
      const UBCcontract = await ethers.getContractFactory("BUCertification");
      universityCert = await UBCcontract.deploy(deployer.address);
      await universityCert.deployed();
      console.log("BUCcontract address: ", universityCert.address);
      console.log(
        "universityCert verify: ",
        `npx hardhat verify --contract "contracts/BUCertification.sol:BUCertification" --network bscTestnet ${universityCert.address} ${deployer.address}`
        );
    });

  });
});