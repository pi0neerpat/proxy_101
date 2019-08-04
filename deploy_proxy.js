const axios = require('axios');

const Proxy = artifacts.require('Proxy');
const ShipA = artifacts.require('ShipA');

module.exports = async function(deployer, networks, accounts) {
  let shipProxy = new web3.eth.Contract(ShipA.abi, Proxy.address, {
    address: Proxy.address
  });

  axios
    .post('https://oneclickdapp.com/contracts', {
      contractName: 'tuffleBox-shipA',
      contractAddress: proxyDeployment.address,
      abi: ShipA.abi,
      network: 'private',
      creatorAddress: accounts[0]
    })
    .then(res => {
      console.log(
        `View your contract at https://oneclickdapp.com/${res.data.mnemonic}`
      );
    })
    .catch(err => {
      console.log(err.message);
    });
};
