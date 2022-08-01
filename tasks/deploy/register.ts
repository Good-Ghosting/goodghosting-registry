import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { task } from "hardhat/config";

import type { Registry } from "../../src/types/Registry";
import type { Registry__factory } from "../../src/types/factories/Registry__factory";

task("deploy:Registry").setAction(async function (_, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const registryFactory = await ethers.getContractFactory("Registry");
  const registry = await registryFactory.connect(signers[0]).deploy();
  await registry.deployed();
  console.log("Registry deployed to: ", registry.address);
});
