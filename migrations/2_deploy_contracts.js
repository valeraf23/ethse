const Debts = artifacts.require('./Debts.sol');
const OffChain = artifacts.require('./lendOrder.sol');

module.exports = deployer => {
  deployer.deploy(Debts);
};
module.exports = deployer => {
  deployer.deploy(OffChain);
};
