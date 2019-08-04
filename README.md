# Proxy Boxy

Built for Trufflecon in Redmond, Washington
Aug 2-4 2019
Proxy 101 Save Gas and prevent Headaches

## Overview

0. What is a Proxy
1. Use Remix to play with the contracts
1. Closer look at the contracts
1. Use Truffle and OneClickDapp to go through the example again
1. Best practices and use-cases

## 0. What is a Proxy

## 1. Use Remix to play with the contracts

[Remix Example](https://remix.ethereum.org/#gist=6da9368618132420d958dfbba5db54eb)

## 2. Closer look at the contracts

## 3. Use Truffle and OneClickDapp to go through the example again

## 4. Best practices and use-cases

You are sailing the high seas. Your ship runs out of fuel. How do you upgrade your ship easily to add a RENEWABLE ENERGY source? How can we make it easy to

`truffle migrate`

# Welcome to truffle-proxy

Winning project at **ConsenSys Grants Hackathon - New York - July 2019**

> See **truffle-proxy-ui** [here](https://github.com/mdcoon/truffle-proxy-ui)

> Extend Truffle CLI with [EIP-1822](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1822.md) proxy support. Proxy support provides a simple upgrade path for contracts to maintain storage, while making changes to the underlying contract implementation.

## Install

```sh
// tip: to start a new truffle project:
// truffle init
// within your truffle project:
npm init -y
npm install --save-dev git+https://github.com/mdcoon/truffle-proxy
```

Add the following to your `truffle-config.js`

```json
  plugins: [
    "truffle-proxy"
  ]
```

## Usage

### Add proxy support to a truffle project

Generates EIP-1820 compatible proxy implementation along with example files and
unit tests for your project.

```sh
truffle run create-proxy
```

-----Pat's notes--------
Run truffle migrate before the next step
line 32 in Sample.sol add a ";"

### Run unit tests

Executes all unit tests against an embedded Ganache blockchain compatible with
proxy contract.

```sh
truffle run test-proxy
```

### Display summary network info

Displays a summary of network / address information for deployed contracts.
Includes details highlighting proxy contracts.

```sh
truffle run summarize-proxy
```
