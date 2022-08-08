import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";

task("deploy:Registry").setAction(async function (_, { ethers }) {
    const admin = "ADMIN_ADDRESS";
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const registryFactory = await ethers.getContractFactory("Registry");
  const registry = await registryFactory.connect(signers[0]).deploy(admin);
  await registry.deployed();
  console.log("Registry deployed to: ", registry.address);
});
