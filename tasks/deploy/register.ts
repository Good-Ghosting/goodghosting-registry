import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { task } from "hardhat/config";

import type { Registry } from "../../src/types/contracts/Registry";
import type { Registry__factory } from "../../src/types/factories/contracts/Registry__factory";

task("deploy:Registry").setAction(async function (_, { ethers }) {
  const admin = "0xCe17fFE0576fBB031aa27225aE05f7384f44bbc5";
  // polygon contracts
  const contracts = [
    "0x360bbc11322c77dadc1ddcdb26224271c96cfd47",
    "0xb81e1db4771c28250c98b3099ec9962e269b4022",
    "0x9b5b6b4e889faca1e4fc836a12102d6ffe8b5f52",
    "0x0f59f76f021bafa4bc3e264e75199afe5d839335",
    "0x4ac6c237160275144b63814227ec71797257e25a",
    "0xde59e1fd6a33091c0f34c675acc455d85620c7d6",
    "0x379eac144939570b3f9289580ef7c8a1f7f76259",
    "0xcc4655afe3a6ce03fae33625f5dfb9592f8f1825",
    "0x8d241842ccd0abcf8e0700c0637019692bf52458",
    "0x6768a8a3dcd689aea3de2a3a51a7626040e8415b",
    "0x83b47f72d880993cacc7d612f80b75220ad9c217",
    "0x388c3df56a924594230e9ca689cabe29055b87cc",
    "0xb12695e555ce0d0ed2b8d3db90a027e234697d98",
    "0xac2def60d45b8bba10cc08d32908364747ee5af2",
    "0x242418f5ec3c218fa339ede8c31ea22a928fbd55",
    "0x4dc2e489e2bc5a4fbf2bfdc3f204e53a0bae5d45",
    "0x90cd21957b03b4014e0db2159cd75cad1c9d5486",
    "0x90a47003f208b09ba8c74ea05c34cbf6fc73b4d8",
    "0xd613ede2ed8a05ae00f51b2046a1281671643eb3",
    "0x34962df66e390b9aae6f353d1437931d6e874d2b",
    "0xb0a8fffd2bd0174d8fd2d76f8f9072706576bfa1",
    "0xb5d5b0967a746419e84f8a900eef97fe40dea614",
    "0x4d45240ffda4e3daa41f5564de99ecd2460f1f67",
    "0xaf96213bbb61675ea2f4b27b602a40b110fd9127",
    "0x224cc7e2e84947f491dbe03c24334021b8671fd4",
    "0xc1fc9ff2ea44aaaa46a9520c0c9b83baec7b846c",
    "0xcf9d9cc4f2439488fb8065ab2735d7c62078a15a",
  ];

  const signers: SignerWithAddress[] = await ethers.getSigners();
  const registryFactory = await ethers.getContractFactory("Registry");
  const registry = await registryFactory.connect(signers[0]).deploy(admin);
  await registry.deployed();
  console.log("Registry deployed to: ", registry.address);
  await registry.addContract(contracts);
});
