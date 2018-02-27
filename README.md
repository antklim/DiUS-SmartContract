# DiUS-SmartContract
An example of smart contract written in Solidity

## Prerequisites
To work with the smart contract you will need:
* [Truffle](http://truffleframework.com/)
* [Ganache](http://truffleframework.com/ganache/)

## Testing
__Note!__ Network configuration for truffle is in the `truffle.js` file.
In case if you start `develop`, `ganache`, or other nodes on different ports or different network id, you will need to add this information to `truffle.js` to be able to deploy contracts to such nodes.

__Option 1.__ Testing on `develop` network.  
1. Go to the project directory.

2. Run the the following command to start `develop` network:
```
$ truffle develop
```
The network will start and you get to the `truffle` console.
3. From the console run the following command to deploy contracts:
```
truffle(develop)> migrate --compile-all --reset
```
4. Run tests:
```
truffle(develop)> test
```

__Option 2.__ Testing on `Ganache`:
1. Go to the project directory.
2. Run `Ganache`.
3. Run the following command to deploy contracts:
```
$ truffle migrate --compile-all --reset --network ganache
```
4. Run tests:
```
$ truffle test --network ganache
```

## Using contract
1. Deploy contract as described in __Testing__ section.
2. Log in to `truffle console` on the network:
```
$ truffle console --network ganache
# or
$ truffle console --network develop
```
3. Retrieve an instance of the contract:
```
truffle(develop)> DiUS.deployed().then(instance => {app = instance})
```
4. Use methods of contract via `app`. For example:
```
truffle(develop)> app.getNumberOfEmployees()
# or
truffle(develop)> app.registerEmployee('Name', {from: '0xACCOUNT'})
```

`truffle console` exposes [web3](https://github.com/ethereum/web3.js/) library for you to use. With this library's methods you can get access to Ethereum node API.
