const DiUS = artifacts.require("./DiUS.sol")

contract('DiUS', (accounts) => {
  let diusInstance
  let manager = accounts[0]
  let employee = accounts[1]
  let employeeName = 'John Doe'

  it('should be initialised with empty values', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.getNumberOfEmployees()
    })
    .then((data) => {
      assert.equal(data.toNumber(), 0)
    })
  )

  it('should register employee', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.registerEmployee(employeeName, {from: employee})
    })
    .then((receipt) => {
      return diusInstance.getNumberOfEmployees()
    })
    .then((data) => {
      assert.equal(data.toNumber(), 1)
    })
  )

  it('should not register employee second time', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.registerEmployee(employeeName, {from: employee})
    })
    .then((receipt) => {
      return diusInstance.registerEmployee(employeeName, {from: employee})
    })
    .then(assert.fail)
    .catch(assert)
    .then(() => {
      return diusInstance.getNumberOfEmployees()
    })
    .then((data) => {
      assert.equal(data.toNumber(), 1)
    })
  )

  it('should return leave balance', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.getLeaveBalance({from: employee})
    })
    .then((data) => {
      assert.equal(data.toNumber(), 28)
    })
  )

  it('employee can apply for leave', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.applyForLeave(10, {from: employee})
    })
    .then((receipt) => {
      return diusInstance.getLeaveBalance({from: employee})
    })
    .then((data) => {
      assert.equal(data.toNumber(), 18)
    })
  )

  it('not registered employee can not apply for leave', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.applyForLeave(10, {from: accounts[2]})
    })
    .then(assert.fail)
    .catch(assert)
  )

  it('manager can top up leave balance', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.topUpLeaveBalance(5, employee, {from: manager})
    })
    .then((receipt) => {
      return diusInstance.getLeaveBalance({from: employee})
    })
    .then((data) => {
      assert.equal(data.toNumber(), 23)
    })
  )

  it('manager can not top up leave balance of unregistered employee', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.topUpLeaveBalance(5, accounts[2], {from: manager})
    })
    .then(assert.fail)
    .catch(assert)
  )

  it('employee can not top up leave balance', () =>
    DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.topUpLeaveBalance(5, employee, {from: employee})
    })
    .then(assert.fail)
    .catch(assert)
  )

  it('manager pays to employee', () => {
    let employeeBalanceBeforePayRoll
    let salaryInEth = 10

    return DiUS.deployed().then((instance) => {
      diusInstance = instance
      employeeBalanceBeforePayRoll = web3.fromWei(web3.eth.getBalance(employee), 'ether').toNumber()
      return diusInstance.payRoll(employee, {from: manager, value: web3.toWei(salaryInEth, 'ether')})
    })
    .then((receipt) => {
      let employeeBalanceAfterPayRoll = web3.fromWei(web3.eth.getBalance(employee), 'ether').toNumber()
      assert.equal(employeeBalanceAfterPayRoll, employeeBalanceBeforePayRoll + salaryInEth)
    })
  })

  it('manager can not pay to unregistered employee', () => {
    let salaryInEth = 10

    return DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.payRoll(accounts[2], {from: manager, value: web3.toWei(salaryInEth, 'ether')})
    })
    .then(assert.fail)
    .catch(assert)
  })

  it('employee cannot pay to employee', () => {
    let salaryInEth = 10

    return DiUS.deployed().then((instance) => {
      diusInstance = instance
      return diusInstance.payRoll(employee, {from: accounts[2], value: web3.toWei(salaryInEth, 'ether')})
    })
    .then(assert.fail)
    .catch(assert)
  })
})
