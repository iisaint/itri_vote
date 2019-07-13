var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Vote = artifacts.require("./Vote.sol");

module.exports = function(deployer, networks, accounts) {
  // console.log(networks);
  // console.log(accounts);
  deployer.deploy(SimpleStorage);
  deployer.deploy(Vote, 1000);
};
