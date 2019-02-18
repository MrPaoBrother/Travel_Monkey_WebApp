const cita = require('./cita')
const {
    abi
} = require('./contracts/compiled.js')
const {
    contractAddress
} = require('./config')

const transaction = require('./contracts/transaction')
const simpleStoreContract = new cita.base.Contract(abi, contractAddress)
module.exports = {
    transaction,
    simpleStoreContract
}