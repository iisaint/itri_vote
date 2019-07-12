const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "light decrease man laundry verb stock coil broken drop mimic lunch boy";

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
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/2a6ca69c7286498c9a5da50251cc131f");
      },
      network_id: 3
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/2a6ca69c7286498c9a5da50251cc131f");
      },
      network_id: 4
    }
  }
};

//light decrease man laundry verb stock coil broken drop mimic lunch boy
