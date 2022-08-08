# GoodGhosting Registry

A smart contract that basically keeps track of all deployed goodghosting pools on polygon & celo.

## Deployed Registries (contracts deployed to mainnets)
- Polygon Registry: [0x3367c7211c80840194496185a31868325Dc43150](https://polygonscan.com/address/0x3367c7211c80840194496185a31868325Dc43150)
- Celo Registry: [0x7a495c05d009D346C5Ec942ec49AC519dd7035D0](https://explorer.celo.org/address/0x7a495c05d009D346C5Ec942ec49AC519dd7035D0/transactions)


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
You'll need a rpc provider. The best option for polygon is infura and for celo you can use their public rpc `https://forno.celo.org/`

Before executing the deployment process, you'll need to specify the default admin for the contract.
In order to do so, open the file [tasks/deploy/register.ts](./tasks/deploy/register.ts), and set the desired admin address in the variable `admin`.
You should see a line similar to `const admin = "ADMIN_ADDRESS";`. Replace `ADMIN_ADDRESS` by the admin address of the registry.

## Polygon
Start by setting the `MNEMONIC` & `INFURA_API_KEY` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L59) as `polygon-mainnet` in hardhat config, then run `yarn deploy`

## Celo
Start by setting the `MNEMONIC` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L59) as `celo` in hardhat config, then run `yarn deploy`

### Deployment Logs
You'll see something like this
`Registry deployed to:  registry_address`

