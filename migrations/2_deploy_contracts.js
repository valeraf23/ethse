const Debts = artifacts.require('./Debts.sol');
const OffChain = artifacts.require('./lendOrder.sol');
const Ownable = artifacts.require('./ownable.sol');
const SafeMath = artifacts.require('./SafeMath.sol');


module.exports = deployer => {
  deployer.deploy(Debts);
};
module.exports = deployer => {
  deployer.deploy(LendOrder);
};
module.exports = deployer => {
  deployer.deploy(Ownable);
};
module.exports = deployer => {
  deployer.deploy(SafeMath);
};
