# GoodGhosting Registry

A Registry that keeps track of all HaloFi Challenges (prev. GoodGhosting Pools) deployed.

## Deployed Registries

- Polygon Registry: [0x3367c7211c80840194496185a31868325Dc43150](https://polygonscan.com/address/0x3367c7211c80840194496185a31868325Dc43150)
- Celo Registry: [0x7a495c05d009D346C5Ec942ec49AC519dd7035D0](https://explorer.celo.org/address/0x7a495c05d009D346C5Ec942ec49AC519dd7035D0/transactions)
- Base Registry: [0x97c447dEF7Cb858922f0cF83fa3695708191CA8e](https://basescan.org/address/0x97c447def7cb858922f0cf83fa3695708191ca8e)
- Base Goerli Registry: [0x3dF167fCed9E1805df2F923d895d0cAA2257E152](https://goerli.basescan.org/address/0x3df167fced9e1805df2f923d895d0caa2257e152)

# Development

## Setup

Create a local `.env` file by copying the sample `.env.sample` file available in the root folder (`cp .env.sample .env`). After your `.env` file is created, edit it with appropriate values for the variables.

Install Project dependencies

```bash
yarn install
```

## Common Development Commands

Compile the smart contracts

```bash
yarn compile
```

TypeChain
Compile the smart contracts and generate TypeChain bindings:

```bash
yarn typechain
```

Tests

```bash
yarn test
```

Coverage

```bash
yarn coverage
```

# Deployment

You'll need a rpc provider. The best option for polygon is infura. For celo you can use their public rpc `https://forno.celo.org/`. For Base, you can use the rpc info available at `https://docs.base.org/network-information`.

Before executing the deployment process, you'll need to specify the default admin for the contract.
In order to do so, open the file [tasks/deploy/register.ts](./tasks/deploy/register.ts), and set the desired admin address in the variable `admin`.
You should see a line similar to `const admin = "ADMIN_ADDRESS";`. Replace `ADMIN_ADDRESS` by the admin address of the registry.

## Polygon

Start by setting the `MNEMONIC` & `INFURA_API_KEY` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L68) as `polygon-mainnet` in hardhat config, then run `yarn deploy`

## Celo

Start by setting the `MNEMONIC` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L68) as `celo` in hardhat config, then run `yarn deploy`

## Base

Start by setting the `MNEMONIC` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L68) as `base` in hardhat config, then run `yarn deploy`

## Base Goerli

Start by setting the `MNEMONIC` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L68) as `base-goerli` in hardhat config, then run `yarn deploy`

### Deployment Logs

You'll see something like this
`Registry deployed to: registry_address`

# Verify Contracts

Before verifying, make sure you set the proper API key in your local .env. Check the `config.etherscan` property in the `hardhat.config.ts` file for the correct ENV variable name for the desired network.
Once the .env file is set, you can use the command below to verify the contract:

```bash
npx hardhat verify --network {network-name} {deployed-contract-address} {constructor-args-deployed-contract-address}
```

Example:

```bash
npx hardhat verify --network base-goerli 0x3dF167fCed9E1805df2F923d895d0cAA2257E152 0xf6e92ee5a4beb6fe8e982971e4034afac0f0e399
```
