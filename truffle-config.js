const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const keys = require('./config/keys');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(keys.mnemonic, keys.infura);
      },
      network_id: 3
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(keys.mnemonic, keys.infura);
      },
      network_id: 4
    }
  }
};

//light decrease man laundry verb stock coil broken drop mimic lunch boy
