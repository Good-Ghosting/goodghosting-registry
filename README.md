# GoodGhosting Registry

A smart contract that basically keeps track of all deployed goodghosting pools on polygon & celo.

# Development

## Setup

Create a local `.env` file by copying the sample `.env.sample` file available in the root folder (`cp .env.sample .env`). After your `.env` file is created, edit it with appropriate values for the variables.

Install Project dependencies

```bash
yarn install
```

## Common Development Commands

Compile contracts

```bash
yarn compile
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

## Polygon
Start by setting the `MNEMONIC` & `INFURA_API_KEY` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L59) as `polygon-mainnet` in hardhat config, then run `yarn deploy`

## Celo
Start by setting the `MNEMONIC` in .env & set [default network](https://github.com/Good-Ghosting/goodghosting-registry/blob/main/hardhat.config.ts#L59) as `celo` in hardhat config, then run `yarn deploy`


