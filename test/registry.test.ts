import * as chai from "chai";
import { expect } from "chai";
import { assert } from "console";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

import { MockPool, MockPool__factory, Registry, Registry__factory } from "../src/types";

chai.use(solidity);

describe("Registry Tests", () => {
  let registryInstance: Registry;
  let mockPool: MockPool;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const registryDeployer = new Registry__factory(deployer);
    registryInstance = await registryDeployer.deploy(deployer.address);

    const mockDeployer = new MockPool__factory(deployer);
    mockPool = await mockDeployer.deploy();
  });

  it("reverts if a random user tried to add a contract", async () => {
    const [, user] = await ethers.getSigners();
    await expect(registryInstance.connect(user).addContract([mockPool.address])).to.be.revertedWith("NOT_AUTHORIZED()");
  });

  it("reverts if you try to add an eoa as a contract", async () => {
    const [, user] = await ethers.getSigners();
    await expect(registryInstance.addContract([user.address])).to.be.revertedWith("INVALID_POOL()");
  });

  it("reverts if a duplicate pool is added", async () => {
    await expect(registryInstance.addContract([mockPool.address, mockPool.address])).to.be.revertedWith(
      "DUPLICATE_POOL()",
    );
  });

  it("the admin is able to add the contract to the registry", async () => {
    const [deployer] = await ethers.getSigners();
    const result = await registryInstance.addContract([mockPool.address]);
    const status = await registryInstance.poolStatus(mockPool.address);
    assert(status);
    await expect(result).to.emit(registryInstance, "LOG_NEW_POOL").withArgs(deployer.address, mockPool.address);
  });

  it("operator is able to add a contract to the registry", async () => {
    const [, user] = await ethers.getSigners();
    const operatorRole = await registryInstance.OPERATOR_ROLE();
    await registryInstance.grantRole(operatorRole, user.address);
    const result = await registryInstance.connect(user).addContract([mockPool.address]);
    const status = await registryInstance.poolStatus(mockPool.address);
    assert(status);
    await expect(result).to.emit(registryInstance, "LOG_NEW_POOL").withArgs(user.address, mockPool.address);
  });

    it("updates pool index when adding new contract to the registry", async () => {
    const [deployer] = await ethers.getSigners();
    const mockDeployer = new MockPool__factory(deployer);
    const newPool = await mockDeployer.deploy();
    await registryInstance.addContract([mockPool.address, newPool.address]);
    const mockIndex = await registryInstance.poolIndex(mockPool.address);
    expect(mockIndex).equal(ethers.BigNumber.from('0'), 'mock pool index not set');
    const newPoolIndex = await registryInstance.poolIndex(newPool.address);
    expect(newPoolIndex).equal(ethers.BigNumber.from('1'), 'new pool index not set');
  });

  it("emits multiple events when adding multiple contracts to the registry", async () => {
    const [deployer] = await ethers.getSigners();
    const mockDeployer = new MockPool__factory(deployer);
    const newPool = await mockDeployer.deploy();
    const result = await registryInstance.addContract([mockPool.address, newPool.address]);
    await expect(result).to.emit(registryInstance, "LOG_NEW_POOL").withArgs(deployer.address, mockPool.address);
    await expect(result).to.emit(registryInstance, "LOG_NEW_POOL").withArgs(deployer.address, newPool.address);
  });

  it("reverts if a random user tries to remove a contract from the registry", async () => {
    const [, user] = await ethers.getSigners();
    await expect(registryInstance.connect(user).removeContract(mockPool.address)).to.be.revertedWith(
      "NOT_AUTHORIZED()",
    );
  });

  it("reverts if operator tries to remove a contract from the registry", async () => {
    const [, operator] = await ethers.getSigners();
    const operatorRole = await registryInstance.OPERATOR_ROLE();
    await registryInstance.grantRole(operatorRole, operator.address);
    await expect(registryInstance.connect(operator).removeContract(mockPool.address)).to.be.revertedWith(
      "NOT_AUTHORIZED()",
    );
  });

  it("reverts if the admin tries to remove the a non-existent contract from the registry", async () => {
    await expect(registryInstance.removeContract(mockPool.address)).to.be.revertedWith("POOL_DOES_NOT_EXIST()");
  });

  it("admin is able to remove a contract from the registry", async () => {
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    const [deployer] = await ethers.getSigners();
    const mockDeployer = new MockPool__factory(deployer);
    const newPool = await mockDeployer.deploy();
    await registryInstance.addContract([mockPool.address, newPool.address]);
    // ensures new pool index is properly set
    const originalIndex = await registryInstance.poolIndex(newPool.address);
    expect(originalIndex.toString()).equal('1', 'index not reset');
    const result = await registryInstance.removeContract(newPool.address);
    await expect(result).to.emit(registryInstance, "LOG_POOL_REMOVED").withArgs(deployer.address, newPool.address);
    const status = await registryInstance.poolStatus(newPool.address);
    expect(status).equal(false, 'status not reset to false');
    const removedPoolIndexValue = await registryInstance.pools(1);
    expect(removedPoolIndexValue).equal(ZERO_ADDRESS, 'address not reset to 0x');
    const indexReset = await registryInstance.poolIndex(newPool.address);
    expect(indexReset.toString()).equal('0', 'index not reset');
  });
});
