const Reverter = require('./helpers/reverter');
const Asserts = require('./helpers/asserts');
const OffChain = artifacts.require('./LendOrder.sol');

contract('OffChain', function(accounts) {
  const reverter = new Reverter(web3);
  afterEach('revert', reverter.revert);

  const asserts = Asserts(assert);
  const OWNER = accounts[0];
  let offChain;

  before('setup', () => {
      const borrower = accounts[3];
    return OffChain.deployed()
    .then(instance => offChain = instance)
    .then(offChain.register('VF',{from: borrower}))
    .then(reverter.snapshot);
  });

  it('should allow to repay', () => {
    const borrower = accounts[3];
    const value = 1000;
    return Promise.resolve()
    .then(() => offChain.lendMoney(value, {from: borrower}))
    .then(() => offChain.repayMoney(borrower, value, {from: OWNER}))
    .then(() => offChain.balanceByAddr(borrower))
    .then(asserts.equal(0));
  });

  // it('should fail on overflow when borrowing', () => {
  //   const borrower = accounts[3];
  //   const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  //   return Promise.resolve()
  //   .then(() => debts.borrow(value, {from: borrower}))
  //   .then(() => asserts.throws(debts.borrow(1, {from: borrower})));
  // });
  //
  // it('should emit Borrowed event on borrow', () => {
  //   const borrower = accounts[3];
  //   const value = 1000;
  //   return Promise.resolve()
  //   .then(() => debts.borrow(value, {from: borrower}))
  //   .then(result => {
  //     assert.equal(result.logs.length, 1);
  //     assert.equal(result.logs[0].event, 'Borrowed');
  //     assert.equal(result.logs[0].args.by, borrower);
  //     assert.equal(result.logs[0].args.value.valueOf(), value);
  //   });
  // });
  //
  // it('should allow to borrow', () => {
  //   const borrower = accounts[3];
  //   const value = 1000;
  //   return Promise.resolve()
  //   .then(() => debts.borrow(value, {from: borrower}))
  //   .then(() => debts.debts(borrower))
  //   .then(asserts.equal(value));
  // });
  //
  // it('should emit Repayed event on repay', () => {
  //   const borrower = accounts[3];
  //   const value = 1000;
  //   return Promise.resolve()
  //   .then(() => debts.borrow(value, {from: borrower}))
  //   .then(() => debts.repay(borrower, value, {from: OWNER}))
  //   .then(result => {
  //     assert.equal(result.logs.length, 1);
  //     assert.equal(result.logs[0].event, 'Repayed');
  //     assert.equal(result.logs[0].args.by, borrower);
  //     assert.equal(result.logs[0].args.value.valueOf(), value);
  //   });
  // });
  //
  // it('should not allow owner to borrow', () => {
  //   const value = 1000;
  //   return Promise.resolve()
  //   .then(() => debts.borrow.call(value, {from: OWNER}))
  //   .then(asserts.equal(false));
  // });
  //
  // it('should not allow not owner to repay', () => {
  //   const borrower = accounts[3];
  //   const value = 1000;
  //   return Promise.resolve()
  //   .then(() => debts.repay.call(borrower, value, {from: borrower}))
  //   .then(asserts.equal(false));
  // });
});