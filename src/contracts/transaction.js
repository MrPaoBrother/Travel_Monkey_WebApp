const cita = require('../cita')
const transaction = {
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 1,
  validUntilBlock: 999999,
  value: '0x0',
}
if (process.env.REACT_APP_RUNTIME === 'web') {
  transaction.from = cita.base.accounts.wallet[0].address
  transaction.privateKey = cita.base.accounts.wallet[0].privateKey
}

module.exports = transaction