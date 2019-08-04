const axios = require('axios');

const ShipA = artifacts.require('ShipA');
const ShipB = artifacts.require('ShipB');
const Proxy = artifacts.require('Proxy');

const SHIP_NAME = 'S.S. Truffle';
const ONE_CLICK_DAPP_URL = 'https://oneclickdapp.com';

module.exports = function(deployer, networks, accounts) {
  // Deploy ShipA and use this to deploy our Proxy
  deployer.deploy(ShipA).then(async a => {
    let con = new web3.eth.Contract(a.abi, a.address, { address: a.address });

    const constructorData = con.methods
      .launch(SHIP_NAME, accounts[0])
      .encodeABI();

    deployer.deploy(Proxy, constructorData, a.address).then(async p => {
      axios
        .post(`${ONE_CLICK_DAPP_URL}/contracts`, {
          contractName: 'ShipA via Proxy',
          contractAddress: p.address,
          abi: ShipA.abi,
          network: 'private',
          creatorAddress: accounts[0]
        })
        .then(res => {
          console.log(
            `\n\nAccess ShipA via the Proxy at:\n\n    ${ONE_CLICK_DAPP_URL}/${
              res.data.mnemonic
            }`
          );
        })
        .catch(err => {
          console.log(err.message);
        });

      deployer.deploy(ShipB).then(async b => {
        axios
          .post(`${ONE_CLICK_DAPP_URL}/contracts`, {
            contractName: 'ShipB via Proxy',
            contractAddress: p.address,
            abi: ShipB.abi,
            network: 'private',
            creatorAddress: accounts[0]
          })
          .then(res => {
            console.log(
              `\nWhen you're ready to upgrade call the function abandonShipTo() \non ShipA using the address for the ShipB logic contract\n`
            );
            console.log(b.address);
            console.log(
              `\nAccess ShipB via the Proxy at:\n\n     ${ONE_CLICK_DAPP_URL}/${
                res.data.mnemonic
              }`
            );
          })
          .catch(err => {
            console.log(err.message);
          });
      });
    });
  });
};
