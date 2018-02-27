module.exports = {
  networks: {
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    },
    develop: {
      host: 'localhost',
      port: 9545,
      network_id: '*'
    }
  }
};
