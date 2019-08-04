const axios = require('axios');
const Proxy = artifacts.require('Proxy');
const ShipA = artifacts.require('ShipA');
const ShipB = artifacts.require('ShipB');

const ONE_CLICK_DAPP_URL = 'https://oneclickdapp.com';

contract('ShipExample', accounts => {
  it('should initialize the proxy using ShipA', async () => {
    const proxyDeployment = await Proxy.deployed();

    // Create a conract object using ABI from ShipA, but Address for Proxy
    let shipProxy = new web3.eth.Contract(ShipA.abi, proxyDeployment.address, {
      address: proxyDeployment.address
    });

    // Call our contract to see if it works
    shipProxy.methods
      .captain()
      .call()
      .then(captain => {
        // Check if we are listed as the captain
        assert.equal(accounts[0], captain);
        // Create a One Click Dapp
        axios
          .post(`${ONE_CLICK_DAPP_URL}/contracts`, {
            contractName: 'tuffleBox-shipA',
            contractAddress: proxyDeployment.address,
            abi: ShipA.abi,
            network: 'private',
            creatorAddress: accounts[0]
          })
          .then(res => {
            console.log(
              `Access ShipA via the Proxy at ${ONE_CLICK_DAPP_URL}/${
                res.data.mnemonic
              }`
            );
          })
          .catch(err => {
            console.log(err.message);
          });
      });
  });

  it('should deploy ShipB and prepare for an upgrade', async () => {
    const proxyDeployment = await Proxy.deployed();
    const shipBDeployed = await ShipB.deployed();

    axios
      .post(`${ONE_CLICK_DAPP_URL}/contracts`, {
        contractName: 'tuffleBox-shipA',
        contractAddress: proxyDeployment.address,
        abi: ShipB.abi,
        network: 'private',
        creatorAddress: accounts[0]
      })
      .then(res => {
        console.log('Is it time for an upgrade?');
        console.log(
          'Call the function updateCodeAddress() and provide the address for ShipB logic contract:'
        );
        console.log(shipBDeployed.address);
        console.log(
          `Access ShipB via the Proxy at ${ONE_CLICK_DAPP_URL}/${
            res.data.mnemonic
          }`
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
