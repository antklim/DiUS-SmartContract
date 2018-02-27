pragma solidity ^0.4.18;

contract Manageble {
  address manager;

  modifier onlyManager() {
    require(msg.sender == manager);
    _;
  }

  function Manageble() public {
    manager = msg.sender;
  }
}
