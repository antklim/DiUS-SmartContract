pragma solidity ^0.4.18;

import "./Manageble.sol";

contract DiUS is Manageble {

  struct Employee {
    string name;
    uint leaveBalance;
    bool registered;
  }

  mapping (address => Employee) public employees;
  uint employeesCounter;

  function kill() public onlyManager {
    selfdestruct(manager);
  }

  function getNumberOfEmployees() public view returns (uint) {
    return employeesCounter;
  }

  function registerEmployee(string _name) public {
    Employee storage employee = employees[msg.sender];
    require(msg.sender != manager);
    require(!employee.registered);

    employee.name = _name;
    employee.leaveBalance = 28;
    employee.registered = true;
    employeesCounter++;
  }

  function getLeaveBalance() public view returns (uint) {
    Employee storage employee = employees[msg.sender];
    require(employee.registered);
    return employee.leaveBalance;
  }

  function applyForLeave(uint _days) public {
    Employee storage employee = employees[msg.sender];
    require(employee.registered);
    require(employee.leaveBalance >= _days);
    employee.leaveBalance = employee.leaveBalance - _days;
  }

  function topUpLeaveBalance(uint _days, address _employeeAddress) public onlyManager {
    Employee storage employee = employees[_employeeAddress];
    require(employee.registered);
    uint newLeaveBalance = employee.leaveBalance + _days;
    employee.leaveBalance = newLeaveBalance;
  }

  function payRoll(address _employeeAddress) payable public onlyManager {
    Employee storage employee = employees[_employeeAddress];
    require(employee.registered);
    _employeeAddress.transfer(msg.value);
  }
}
